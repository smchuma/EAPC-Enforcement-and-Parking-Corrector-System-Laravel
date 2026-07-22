<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class BackfillControlNumberTargets extends Command
{
    protected $signature = 'users:backfill-control-number-targets {--dry-run : Show what would change without saving}';

    protected $description = 'Fill in the standard control-number target (collector: 100k, enforcement: 150k) for users who don\'t have one set yet';

    public function handle(): int
    {
        $dryRun = $this->option('dry-run');
        $changed = 0;

        foreach (User::whereIn('role', array_keys(User::CONTROL_NUMBER_TARGETS))->get() as $user) {
            if (! empty($user->control_number_target)) {
                continue;
            }

            $default = User::defaultControlNumberTarget($user->role);

            $this->line("{$user->first_name} {$user->last_name} ({$user->role}): -> {$default}");
            $changed++;

            if (! $dryRun) {
                $user->forceFill(['control_number_target' => $default])->save();
            }
        }

        $this->info($dryRun
            ? "{$changed} user(s) would be updated. Re-run without --dry-run to apply."
            : "{$changed} user(s) updated.");

        return self::SUCCESS;
    }
}
