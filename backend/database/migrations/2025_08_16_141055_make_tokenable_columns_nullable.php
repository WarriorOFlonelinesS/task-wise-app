<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Drop the tokens view first since it depends on the columns we're altering
        DB::statement('DROP VIEW IF EXISTS tokens');

        Schema::table('personal_access_tokens', function (Blueprint $table) {
            // Make tokenable columns nullable temporarily for debugging
            $table->string('tokenable_type')->nullable()->change();
            $table->unsignedBigInteger('tokenable_id')->nullable()->change();
        });

        // Recreate the tokens view
        DB::statement('CREATE VIEW tokens AS SELECT * FROM personal_access_tokens');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Drop the tokens view first
        DB::statement('DROP VIEW IF EXISTS tokens');

        Schema::table('personal_access_tokens', function (Blueprint $table) {
            // Make tokenable columns NOT NULL again
            $table->string('tokenable_type')->nullable(false)->change();
            $table->unsignedBigInteger('tokenable_id')->nullable(false)->change();
        });

        // Recreate the tokens view
        DB::statement('CREATE VIEW tokens AS SELECT * FROM personal_access_tokens');
    }
};
