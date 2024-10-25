<?php

namespace App\Rules;

use App\Models\ControlNumber;
use Illuminate\Contracts\Validation\Rule;

class ControlNumberUnique implements Rule
{
    protected $existingUser;

    public function passes($attribute, $value)
    {
        // Query the ControlNumber model to check if this control number already exists
        $controlNumber = ControlNumber::where('control_number', $value)->first();

        // If it exists, store the user who created it for the error message
        if ($controlNumber) {
            $this->existingUser = $controlNumber->report->user;
            return false;
        }

        return true;
    }

    public function message()
    {
        // Check if we have an existing user and append their name to the error message
        if ($this->existingUser) {
            return 'Control number uliongiza imechukuliwa na ' . $this->existingUser->first_name . ' ' . $this->existingUser->last_name;
        }

        return 'Control number uliongiza imechukuliwa.';
    }
}
