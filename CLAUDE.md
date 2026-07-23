# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

EAPC (Enforcement & Parking Corrector System) is a Laravel 10 + Inertia.js (React) app for managing parking enforcement staff, their daily sales/control-number reports, and admin/supervisor oversight. "Taarifa" (Swahili for "report/information") is the domain term used throughout for the reporting feature.

## Commands

**Backend (PHP — Composer lives under Herd's PHP on this machine; plain `php`/`composer` on PATH may not resolve to it, use PowerShell if a Bash shell can't find them):**
```
composer install
php artisan serve
php artisan test                              # run all tests (PHPUnit)
php artisan test --filter=TestClassOrMethod   # run a single test
php artisan config:clear                      # after any .env / config change
php artisan route:list                        # inspect registered routes
```

**Frontend (Vite):**
```
npm install
npm run dev      # Vite dev server, pairs with `php artisan serve`
npm run build
```

There is no lint/format script wired in `package.json`; `laravel/pint` is available for PHP (`vendor/bin/pint`) but not configured with a custom ruleset.

**Note on `tests/Feature/Auth/RegistrationTest.php`**: this is a leftover Breeze scaffolding test. Self-registration was removed from the app (no `/register` route, no `Register.jsx`) — all users are created by an admin. This test will fail/is stale; don't treat it as a spec for current behavior.

## Architecture

**Database is MongoDB, not SQL** — via `mongodb/laravel-mongodb`. Models extend `MongoDB\Laravel\Eloquent\Model` (or `MongoDB\Laravel\Auth\User` for the `User` model), not the standard Eloquent base. Connection is configured via `.env` (`DB_CONNECTION=mongodb`, `DB_URI`, `MONGO_DB_USERNAME`/`MONGO_DB_PASSWORD`, pointed at an Atlas cluster) and `config/database.php`'s `mongodb` connection. Because MongoDB is schemaless, **new model fields don't need a migration** — just add them to `$fillable`/`$casts` and start writing them. The SQL-style migrations under `database/migrations/` (e.g. `create_users_table`, `create_password_reset_tokens_table`) are vestigial from Laravel's default scaffolding and don't reflect the actual schema in use.

**Auth is Laravel Breeze scaffolding with self-registration stripped out.** `routes/auth.php` only has login/password-reset/verify-email/invitation routes — no `/register`. Admins create accounts through `Admin/UserController`-equivalent logic in `AdminController@storeUser`, which creates the user in a `pending` state and emails them an invitation link (see below) rather than the admin choosing a password directly.

**Role-based access** is a plain `role` string column on `User` (`admin`, `supervisor`, `collector`, `enforcement` — no enum, no Spatie/permission package). Route groups in `routes/web.php` gate by prefix + middleware alias: `admin` prefix + `admin` middleware (`app/Http/Middleware/Admin.php`), `supervisor` prefix + `supervisor` middleware, and collector/enforcement-facing routes at the root guarded by the `agent` middleware. Post-login/post-invitation redirect target is centralized in `User::dashboardRoute()` (`app/Models/User.php`) — use that instead of re-deriving the admin/supervisor/else branching.

**Supervisors can temporarily register/manage users too** (`/supervisor/users` + `supervisor.storeUser`/`update_user`/`destroy_user`/`send_invitation` routes) — the user explicitly asked for this as a stopgap ("we can't have just admins for now") and said it will be removed later. These routes point at the *same* `AdminController` methods the admin routes use (only the GET listing has a separate `SupervisorController::viewUsers`, since it renders a different Inertia page/layout). `AdminController::assignableRoles()` is the guard that keeps a supervisor from assigning the `admin` role through this shared endpoint. The frontend components (`UserCreateForm`, `EditUser`, `UsersTable` under `resources/js/Components/Admin/`) take `storeRoute`/`updateRoute`/`deleteRoute`/`inviteRoute` props (defaulting to the `admin.*` names) specifically so they can be reused by `resources/js/Pages/Supervisor/Users.jsx` without duplicating the components. When this is removed, revert: the 5 `supervisor.*` routes, `SupervisorController::viewUsers`, `Supervisor/Users.jsx`, and the "Users" nav link in `SupervisorLayout.jsx`.

**A user can't delete their own account** — `AdminController::destroy_user` checks `$user->id === Auth::id()` and refuses (flash error) before the actual `delete()`, and `UsersTable.jsx` also hides the "Delete" menu item for the logged-in user's own row. This matters most on the supervisor side, since `/supervisor/users` lists supervisors including the one currently logged in (the admin table already excludes the `admin` role entirely).

**Controllers are organized by role/domain, not REST resource**: `app/Http/Controllers/Admin/AdminController.php` (user management, targets, admin reports/dashboard), `app/Http/Controllers/Supervisor/SupervisorController.php`, `app/Http/Controllers/Taarifa/{TaarifaController,ReportController}.php` (collector/enforcement report submission + admin's full-report views/exports), `app/Http/Controllers/ControlNumberController.php`. Most of these are large single controllers rather than split into narrower ones — follow that pattern rather than introducing new controllers per action.

**Core models & relationships**: `User` has many `Report` (as submitter) and `supervisedReports` (as `supervisor_id`), and many `ControlNumber`. `Report` belongs to a `User` (submitter) and a `User` (`supervisor_id`), and has many `ControlNumber`. `ControlNumber` belongs to both `Report` and `User`.

**Frontend is Inertia.js React**, pages under `resources/js/Pages/{Admin,Supervisor,Taarifa,Auth,Profile}`, with shared components in `resources/js/Components` (including a shadcn/radix-based `ui/` primitives folder, MUI's `x-data-grid` for some tables, `recharts` for charts, `sweetalert2` for confirm dialogs, `react-hot-toast` for toasts).

**Flash messages → toast is global, one path only.** `AppServiceProvider::boot()` shares a `session` prop (`success`/`error`/`warning`, read from `Session::get(...)`), and `resources/js/Context/ToastContext.jsx`'s `ToastProvider` (mounted in both `AdminLayout` and `SupervisorLayout`) watches that prop and fires the matching toast automatically on every Inertia response. Because of this, **individual forms should NOT also call `toast.success`/`toast.error` from their `onSuccess` handler for a flash-driven message** — that double-fires the same toast (this happened once with `UserCreateForm`/`UsersTable` and had to be reverted). Per-form `onError` toasts are still fine/needed since validation errors (422) don't go through a redirect/flash at all.

**Email invitations**: new/reset user accounts go through a token-based invite flow (`app/Http/Controllers/Auth/InvitationController.php`, `app/Notifications/UserInvitationNotification.php` for new invites, `app/Notifications/PasswordResetLinkNotification.php` for existing users — `AdminController@sendInvitation` picks between them based on `$user->status`). A random token is hashed (`hash('sha256', ...)`) and stored on the user's `invitation_token`/`invitation_expires_at` fields, the raw token is only ever emailed. Mail goes through Resend (`resend/resend-laravel`, mailer name `resend` in `config/mail.php`, needs `RESEND_KEY` + `MAIL_FROM_ADDRESS` in `.env`) — this is live and working. Both `storeUser` and `sendInvitation` wrap the `notify()` call in `try/catch (\Throwable)`: a mail failure (bad DNS, Resend down, etc.) never 500s the request — it still creates/updates the user and flashes a `warning`/`error` message instead.

**Usernames** are auto-generated as `f.lastname` (e.g. `s.mchuma`) via `User::generateUsername()`, with collision fallback to more leading letters then a numeric suffix. **Login authenticates by `username`, not email** (`LoginRequest::authenticate()`) — keep that in mind before assuming email changes affect login.

**Control-number targets are auto-assigned by role**, not entered by hand: `User::CONTROL_NUMBER_TARGETS` (collector: 100000, enforcement: 150000) and `User::defaultControlNumberTarget($role)` are the single source of truth. `AdminController::storeUser` sets it at creation; `update_user` fills it in only if empty (never overwrites a manual override) when a role changes. `php artisan users:backfill-control-number-targets --dry-run` exists for one-off backfills of existing users. The "Add Target" UI (`AddTarget.jsx`) is really an *override* dialog now, not a required step.

**Pagination is the standard for every list view**, 10 per page. Two patterns depending on where the data comes from:
- Backend already returns a Laravel paginator (`->paginate(10)`) → render `resources/js/Components/PaginationLinks.jsx` under the table, passing the paginator object as `meta`. Used by Users, Targets, and Taarifa's own report list.
- Data is aggregated/grouped in PHP or JS from a full `->get()` (e.g. Top Sellers leaderboard, the grouped per-user-per-day report tables) → paginate client-side with `resources/js/Components/Pagination.jsx` instead of trying to paginate raw un-grouped rows. Dashboard charts are the one exception that intentionally keep the full unpaginated dataset (they need it to draw trends).
When adding a new admin/supervisor list page, follow one of these two patterns rather than rendering an unbounded list.

**Numbers in tables get thousands separators** via `resources/js/lib/formatNumber.js` (`formatNumber` for integers like targets, `formatMoney` for 2-decimal currency totals) — use these instead of printing a raw number or `.toFixed(2)`.

**Error handling is defense-in-depth, not just try/catch on individual actions.** `app/Exceptions/Handler.php::render()` intercepts 403/404/429/500/503 outside `local`/`testing` and renders `resources/js/Pages/Error.jsx` as a normal Inertia page instead of Laravel's raw error HTML (a 419 expired-session instead redirects back with a flash message). On the frontend, `resources/js/Components/ErrorBoundary.jsx` wraps the whole app in `app.jsx` so a JS render error shows a "Reload Page" card instead of a blank white screen. Both are deliberately silent while `APP_ENV=local` so full stack traces still show up during development.

**Branding**: `public/favicon.svg` (blue rounded square, single "E") is the only "logo" that exists — there's no real logo yet. It's linked as the favicon in `app.blade.php` and reused as an `<img>` badge next to the "EAPCS" wordmark in `Sidebar.jsx`. The browser tab title format (`{VITE_APP_NAME} - Page Name`, currently `EAPCS - Page Name`) comes from `resources/js/app.jsx`'s `title` callback plus `VITE_APP_NAME` in `.env` (a separate var from `APP_NAME` — Vite only exposes `VITE_`-prefixed vars to the browser bundle, and it's baked in at build/dev-server-start time, so changing it needs a restart, not just a page refresh). Most Inertia pages need their own `<Head title="..." />`, since without one the tab title just carries over from whatever page was visited last.
