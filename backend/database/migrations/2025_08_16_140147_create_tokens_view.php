<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Create a view that aliases 'tokens' to 'personal_access_tokens'
        DB::statement('CREATE VIEW tokens AS SELECT * FROM personal_access_tokens');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Drop the view
        DB::statement('DROP VIEW IF EXISTS tokens');
    }
};
