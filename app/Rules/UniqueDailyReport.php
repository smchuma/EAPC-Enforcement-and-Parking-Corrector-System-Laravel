<?php

namespace App\Rules;

use App\Models\Report;
use Carbon\Carbon;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class UniqueDailyReport implements ValidationRule
{
    protected $userId;

    public function __construct($userId)
    {
        $this->userId = $userId;
    }

    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $today = Carbon::today();

        // Check if a report exists for the given user and today's date
        $existingReport = Report::where('user_id', $this->userId)
            ->whereDate('created_at', $today)
            ->exists();

        if ($existingReport) {
            $fail('Ripoti ya mtumiaji tayari imetumwa leo. Tafadhali subiri hadi kesho ili kutuma nyingine.');
        }
    }
}
