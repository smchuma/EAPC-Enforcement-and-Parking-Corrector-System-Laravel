<?php

namespace App\Console\Commands;

use App\Models\Report;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class PurgeOldSalesProofImages extends Command
{
    protected $signature = 'reports:purge-proof-images {--dry-run : Show what would be deleted without deleting}';

    protected $description = 'Delete sales-proof-image files (and clear the field) for reports older than 24 hours, to save server storage';

    public function handle(): int
    {
        $dryRun = $this->option('dry-run');
        $purged = 0;

        $reports = Report::where('sales_proof_image', '!=', null)
            ->where('created_at', '<=', now()->subHours(24))
            ->get();

        foreach ($reports as $report) {
            $this->line("Report {$report->id} ({$report->created_at}): {$report->sales_proof_image}");
            $purged++;

            if (! $dryRun) {
                Storage::disk('public')->delete($report->sales_proof_image);
                $report->forceFill(['sales_proof_image' => null])->save();
            }
        }

        $this->info($dryRun
            ? "{$purged} image(s) would be deleted. Re-run without --dry-run to apply."
            : "{$purged} image(s) deleted.");

        return self::SUCCESS;
    }
}
