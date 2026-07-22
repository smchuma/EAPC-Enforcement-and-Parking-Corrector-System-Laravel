<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class InvitationController extends Controller
{
    /**
     * Display the "set your password" view for a valid invitation token.
     */
    public function create(string $token): Response|RedirectResponse
    {
        $user = $this->findByToken($token);

        if (! $user) {
            return redirect()->route('login')->with('error', 'This invitation link is invalid or has expired.');
        }

        return Inertia::render('Auth/AcceptInvitation', [
            'token' => $token,
            'email' => $user->email,
            'first_name' => $user->first_name,
        ]);
    }

    /**
     * Set the password for the invited user and log them in.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request, string $token): RedirectResponse
    {
        $validated = $request->validate([
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = $this->findByToken($token);

        if (! $user) {
            throw ValidationException::withMessages([
                'password' => 'This invitation link is invalid or has expired.',
            ]);
        }

        $user->forceFill([
            'password' => Hash::make($validated['password']),
            'status' => 'active',
            'email_verified_at' => now(),
            'invitation_token' => null,
            'invitation_expires_at' => null,
        ])->save();

        Auth::login($user);

        $request->session()->regenerate();

        return redirect($user->dashboardRoute());
    }

    private function findByToken(string $token): ?User
    {
        $user = User::where('invitation_token', hash('sha256', $token))->first();

        if (! $user || ! $user->invitation_expires_at || $user->invitation_expires_at->isPast()) {
            return null;
        }

        return $user;
    }
}
