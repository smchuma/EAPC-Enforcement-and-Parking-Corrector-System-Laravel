<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class TestMongoConnection extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:test-mongo-connection';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test the MongoDB connection';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        try {
            // Attempt to list databases on the MongoDB server
            $databases = DB::connection()->getMongoClient()->listDatabases();

            $this->info('MongoDB connection successful!');

            foreach ($databases as $database) {
                $this->line(' - ' . $database->getName());
            }
        } catch (\Exception $e) {
            // Catch and display any connection errors
            $this->error('MongoDB connection failed: ' . $e->getMessage());
        }
    }
}
