<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    //

    public function index(Request $request) {

        $query = User::query();

        if($request->has('search')) {
            $search = $request->get('search');
            $query->where('first_name', 'LIKE', "%{$search}%");
        }

        return Inertia::render("Admin/Users", [
           "users"=> $query->orderByDesc('created_at')->paginate(5),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'phone_number' => ['required', 'numeric', 'unique:users,phone_number',  'digits:10',],
            'email' => 'required|email|unique:users,email',
            'street' => 'required|string',
            'target' => 'required|numeric',
            'password' => 'required|min:8',
            'role' => 'required|in:enforcer,collector,admin'
        ]);

        User::create([
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'phone_number' => $validated['phone_number'],
            'street' => $validated['street'],
            'target' => $validated['target'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role']
        ]);

        return redirect()->back()->with('success', 'User created successfully.');
    }
}
