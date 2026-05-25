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
        // Проверяем, существует ли таблица, чтобы не упасть с ошибкой
        if (Schema::hasTable('ai_task_analyzers')) {
            Schema::table('ai_task_analyzers', function (Blueprint $table) {
                $table->string('priority')->change();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('ai_task_analyzers')) {
            Schema::table('ai_task_analyzers', function (Blueprint $table) {
                $table->integer('priority')->change();
            });
        }
    }
};