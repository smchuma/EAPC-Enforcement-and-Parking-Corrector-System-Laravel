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

**Controllers are organized by role/domain, not REST resource**: `app/Http/Controllers/Admin/AdminController.php` (user management, targets, admin reports/dashboard), `app/Http/Controllers/Supervisor/SupervisorController.php`, `app/Http/Controllers/Taarifa/{TaarifaController,ReportController}.php` (collector/enforcement report submission + admin's full-report views/exports), `app/Http/Controllers/ControlNumberController.php`. Most of these are large single controllers rather than split into narrower ones — follow that pattern rather than introducing new controllers per action.

**Core models & relationships**: `User` has many `Report` (as submitter) and `supervisedReports` (as `supervisor_id`), and many `ControlNumber`. `Report` belongs to a `User` (submitter) and a `User` (`supervisor_id`), and has many `ControlNumber`. `ControlNumber` belongs to both `Report` and `User`.

**Frontend is Inertia.js React**, pages under `resources/js/Pages/{Admin,Supervisor,Taarifa,Auth,Profile}`, with shared components in `resources/js/Components` (including a shadcn/radix-based `ui/` primitives folder, MUI's `x-data-grid` for some tables, `recharts` for charts, `sweetalert2` for confirm dialogs, `react-hot-toast` for toasts). No global flash-message ↔ toast wiring exists — each form's `onSuccess`/`onError` handler shows its own toast rather than reading Inertia's shared `flash` prop.

**Email invitations**: new/reset user accounts go through a token-based invite flow (`app/Http/Controllers/Auth/InvitationController.php`, `app/Notifications/UserInvitationNotification.php`) — a random token is hashed (`hash('sha256', ...)`) and stored on the user's `invitation_token`/`invitation_expires_at` fields, the raw token is only ever emailed. `AdminController@sendInvitation` re-sends/reset this for any user (new pending accounts or existing ones needing a corrected email). Mail is intended to go through Resend (`resend/resend-laravel`, mailer name `resend` in `config/mail.php`) — requires `RESEND_KEY` and a verified sender in `.env`.

**Usernames** are auto-generated as `f.lastname` (e.g. `s.mchuma`) via `User::generateUsername()`, with collision fallback to more leading letters then a numeric suffix. **Login authenticates by `username`, not email** (`LoginRequest::authenticate()`) — keep that in mind before assuming email changes affect login.
