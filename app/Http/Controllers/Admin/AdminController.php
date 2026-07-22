<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Report;
use App\Models\User;
use App\Notifications\PasswordResetLinkNotification;
use App\Notifications\UserInvitationNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class AdminController extends Controller
{
    //



    public function dashboard()
    {

        $reports = Report::with("control_number", "user")->get();

        return Inertia::render('Admin/Dashboard', [
            "reports" => $reports

        ]);
    }

    public function viewUsers(Request $request) {

        $query = User::query();

        if($request->has('search')) {
            $search = $request->get('search');
            $query->where('first_name', 'LIKE', "%{$search}%");
        }

        return Inertia::render("Admin/Users", [
           "users"=> $query->orderByDesc('created_at')->paginate(10)->withQueryString(),
        ]);
    }

    // Store new users

    public function storeUser(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'phone_number' => ['required', 'numeric', 'unique:users,phone_number',  'digits:10',],
            'email' => 'required|email|unique:users,email',
            'role' => ['required', Rule::in($this->assignableRoles())],
        ]);

        $username = User::generateUsername($validated['first_name'], $validated['last_name']);

        $rawToken = Str::random(64);

        $user = User::create([
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'phone_number' => $validated['phone_number'],
            'email' => $validated['email'],
            'username' => $username,
            'password' => Hash::make(Str::random(40)),
            'role' => $validated['role'],
            'control_number_target' => User::defaultControlNumberTarget($validated['role']),
            'status' => 'pending',
            'invitation_token' => hash('sha256', $rawToken),
            'invitation_expires_at' => now()->addDays(3),
        ]);

        try {
            $user->notify(new UserInvitationNotification($rawToken));
        } catch (\Throwable $e) {
            Log::error('Failed to send user invitation email', [
                'user_id' => $user->id,
                'email' => $validated['email'],
                'error' => $e->getMessage(),
            ]);

            return redirect()->back()->with('warning', "User created (username: {$username}), but the invitation email could not be sent right now — check your internet connection and try again from the Users list using \"Resend Invitation\".");
        }

        return redirect()->back()->with('success', "User created. An invitation has been sent to {$validated['email']} (username will be {$username}).");
    }

    // (Re)send an invitation / password-set link to a user, e.g. after the
    // admin corrects a previously fake email, or an invite link expired.
    public function sendInvitation($id)
    {
        $user = User::findOrFail($id);

        $rawToken = Str::random(64);

        $user->forceFill([
            'invitation_token' => hash('sha256', $rawToken),
            'invitation_expires_at' => now()->addDays(3),
        ])->save();

        $notification = $user->status === 'pending'
            ? new UserInvitationNotification($rawToken)
            : new PasswordResetLinkNotification($rawToken);

        try {
            $user->notify($notification);
        } catch (\Throwable $e) {
            Log::error('Failed to (re)send invitation email', [
                'user_id' => $user->id,
                'email' => $user->email,
                'error' => $e->getMessage(),
            ]);

            return redirect()->back()->with('error', 'Could not send the email right now — check your internet/DNS connection and try again in a moment.');
        }

        return redirect()->back()->with('success', "Password set-up link sent to {$user->email}.");
    }

    ///delete a user

    public function destroy_user($id)
    {

        $user = User::findOrFail($id);

        if ($user->id === Auth::id()) {
            return redirect()->back()->with('error', 'You cannot delete your own account.');
        }

        $user->delete();

        return redirect()->back()->with('success', 'User deleted successfully.');
    }


    // update a user

    public function update_user(Request $request, $id)
{
    $user = User::findOrFail($id);

    $request->validate([
        'first_name' => 'required|string|max:255',
        'last_name' => 'required|string|max:255',
        'email' => ['required', 'email', Rule::unique('users', 'email')->ignore($user->id)],
        'role' => ['required', Rule::in($this->assignableRoles())],

    ]);


    $user->first_name = $request->input('first_name');
    $user->last_name = $request->input('last_name');
    $user->email = $request->input('email');
    $user->role = $request->input('role');

    // Only fill in the standard target if none is set yet (e.g. role just
    // changed into collector/enforcement) - never overwrite a manually
    // adjusted target.
    if (empty($user->control_number_target)) {
        $user->control_number_target = User::defaultControlNumberTarget($request->input('role'));
    }

    $user->save();


    return redirect()->back()->with('success','User updated successfully');

}

public function ViewTargets(Request $request) {

    $query = User::query();

    if($request->has('search')) {
        $search = $request->get('search');
        $query->where('first_name', 'LIKE', "%{$search}%");
    }

    return Inertia::render("Admin/Targets", [
       "users"=> $query->orderByDesc('created_at')->paginate(10)->withQueryString(),
    ]);
}


public function add_target(Request $request, $id)
{
    $user = User::findOrFail($id);

    $user->street = $request->input('street');
    $user->target = $request->input('target');
    $user->control_number_target = $request->input('control_number_target');

    $user->save();


    return redirect()->back()->with('success','Target added successfully');

}


    public function logout() {
     Auth::guard('admin')->logout();
    return redirect()->route('admin.login');
}

    // Supervisors can also register users for now (temporary, will be
    // removed later), but must not be able to grant themselves/others admin.
    private function assignableRoles(): array
    {
        return Auth::user()->role === 'admin'
            ? ['enforcement', 'collector', 'admin', 'supervisor']
            : ['enforcement', 'collector', 'supervisor'];
    }

}
