<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //

        User::updateOrCreate([
            "email" => "admin@eapcs.com"
        ], [
            'first_name' => 'admin@eapcs.com',
            'last_name' => 'EAPCS',
            'phone_number' => '0712122729',
            'role' => 'admin',
            'password' => Hash::make('Admin123')
        ]);
    }
}
