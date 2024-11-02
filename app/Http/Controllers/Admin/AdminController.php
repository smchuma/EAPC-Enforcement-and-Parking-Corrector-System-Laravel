<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AdminController extends Controller
{
    //



    public function dashboard()
    {
        return Inertia::render('Admin/Dashboard', [

        ]);
    }

    public function viewUsers(Request $request) {

        $query = User::query();

        if($request->has('search')) {
            $search = $request->get('search');
            $query->where('first_name', 'LIKE', "%{$search}%");
        }

        return Inertia::render("Admin/Users", [
           "users"=> $query->orderByDesc('created_at')->paginate(5),
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
            'password' => 'required|min:8',
            'role' => 'required|in:enforcer,collector,admin'
        ]);

        User::create([
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'phone_number' => $validated['phone_number'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role']
        ]);

        return redirect()->back()->with('success', 'User created successfully.');
    }

    ///delete a user

    public function destroy_user($id)
    {

        $user = User::findOrFail($id);

        $user->delete();

        return redirect()->back()->with('success', 'User deleted successfully.');
    }

    public function updateUser() {}

}
