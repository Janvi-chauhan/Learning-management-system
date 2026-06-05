<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {

            $table->integer('attendance')->default(0);

            $table->integer('assignments_completed')
                  ->default(0);

            $table->integer('total_assignments')
                  ->default(20);

            $table->integer('tests_completed')
                  ->default(0);

            $table->integer('total_tests')
                  ->default(5);
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {

            $table->dropColumn([
                'attendance',
                'assignments_completed',
                'total_assignments',
                'tests_completed',
                'total_tests'
            ]);
        });
    }
};