<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class RegenerateUsernames extends Command
{
    protected $signature = 'users:regenerate-usernames {--dry-run : Show what would change without saving}';

    protected $description = 'Regenerate every user\'s username into the f.lastname format (e.g. s.mchuma)';

    public function handle(): int
    {
        $dryRun = $this->option('dry-run');
        $changed = 0;

        foreach (User::all() as $user) {
            $newUsername = User::generateUsername($user->first_name, $user->last_name, $user->id);

            if ($newUsername === $user->username) {
                continue;
            }

            $this->line("{$user->first_name} {$user->last_name}: {$user->username} -> {$newUsername}");
            $changed++;

            if (! $dryRun) {
                $user->forceFill(['username' => $newUsername])->save();
            }
        }

        $this->info($dryRun
            ? "{$changed} username(s) would change. Re-run without --dry-run to apply."
            : "{$changed} username(s) updated.");

        return self::SUCCESS;
    }
}
