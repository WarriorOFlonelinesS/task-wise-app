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
<<<<<<< HEAD
<<<<<<<< HEAD:backend/database/migrations/2025_07_24_200417_alter_priority_column_in_ai_task_analyzers_table.php
        Schema::table('ai_task_analyzers', function (Blueprint $table) {
            $table->string('priority')->change();
========
        Schema::table('personal_access_tokens', function (Blueprint $table) {
            //
>>>>>>>> frontend/profile:backend/database/migrations/2025_08_16_164659_fix_user_id_nullable_in_personal_access_tokens.php
=======
        Schema::table('ai_task_analyzers', function (Blueprint $table) {
            $table->string('priority')->change();
>>>>>>> frontend/profile
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
<<<<<<< HEAD
<<<<<<<< HEAD:backend/database/migrations/2025_07_24_200417_alter_priority_column_in_ai_task_analyzers_table.php
        Schema::table('ai_task_analyzers', function (Blueprint $table) {
            $table->integer('priority')->change();
========
        Schema::table('personal_access_tokens', function (Blueprint $table) {
            //
>>>>>>>> frontend/profile:backend/database/migrations/2025_08_16_164659_fix_user_id_nullable_in_personal_access_tokens.php
        });
    }
};

=======
        Schema::table('ai_task_analyzers', function (Blueprint $table) {
            $table->integer('priority')->change();
        });
    }
};
>>>>>>> frontend/profile
