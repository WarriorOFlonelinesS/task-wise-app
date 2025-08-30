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
            // Drop the old polymorphic columns if they exist
            if (Schema::hasColumn('personal_access_tokens', 'tokenable_type')) {
                $table->dropColumn('tokenable_type');
            }
            if (Schema::hasColumn('personal_access_tokens', 'tokenable_id')) {
                $table->dropColumn('tokenable_id');
            }
            
            // Add the user_id column if it doesn't exist
            if (!Schema::hasColumn('personal_access_tokens', 'user_id')) {
                $table->foreignId('user_id')->constrained()->onDelete('cascade');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('personal_access_tokens', function (Blueprint $table) {
            // Remove user_id column
            if (Schema::hasColumn('personal_access_tokens', 'user_id')) {
                $table->dropForeign(['user_id']);
                $table->dropColumn('user_id');
            }
            
            // Add back the polymorphic columns
            $table->morphs('tokenable');
        });
    }
};
