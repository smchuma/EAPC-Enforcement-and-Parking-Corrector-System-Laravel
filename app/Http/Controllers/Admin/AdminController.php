<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Report;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
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
            'role' => 'required|in:enforcement,collector,admin,supervisor'
        ]);

        $firstName = strtolower(preg_replace('/\s+/', '', $validated['first_name']));
        $lastName = strtolower(preg_replace('/\s+/', '', $validated['last_name']));
        $username = substr($firstName, 0, 1) . $lastName;
        $lettersUsed = 1;
        while (User::where('username', $username)->exists() && $lettersUsed < strlen($firstName)) {
            $lettersUsed++;
            $username = substr($firstName, 0, $lettersUsed) . $lastName;
        }

        // Full first name still collides (e.g. two users with identical names) -
        // guarantee uniqueness with a numeric suffix instead of saving a duplicate.
        if (User::where('username', $username)->exists()) {
            $baseUsername = $username;
            $suffix = 2;
            while (User::where('username', $username)->exists()) {
                $username = $baseUsername . $suffix;
                $suffix++;
            }
        }

        User::create([
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'phone_number' => $validated['phone_number'],
            'email' => $validated['email'],
            'username' => $username,
            'password' => Hash::make($validated['password']),
            'role' => $validated['role']
        ]);

        return redirect()->back()->with('success', "User created successfully. Username: {$username}");
    }

    ///delete a user

    public function destroy_user($id)
    {

        $user = User::findOrFail($id);

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
        'role' => 'required|in:enforcer,collector,admin,supervisor'

    ]);


    $user->first_name = $request->input('first_name');
    $user->last_name = $request->input('last_name');
    $user->role = $request->input('role');


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
       "users"=> $query->orderByDesc('created_at')->paginate(5),
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

}
