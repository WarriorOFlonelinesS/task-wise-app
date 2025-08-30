<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('personal_access_tokens', function (Blueprint $table) {
            // Add polymorphic columns that Laravel Sanctum expects
            if (!Schema::hasColumn('personal_access_tokens', 'tokenable_type')) {
                $table->string('tokenable_type')->nullable();
            }
            if (!Schema::hasColumn('personal_access_tokens', 'tokenable_id')) {
                $table->unsignedBigInteger('tokenable_id')->nullable();
            }
            
            // Add index for polymorphic columns
            $table->index(['tokenable_type', 'tokenable_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('personal_access_tokens', function (Blueprint $table) {
            $table->dropIndex(['tokenable_type', 'tokenable_id']);
            $table->dropColumn(['tokenable_type', 'tokenable_id']);
        });
    }
};
