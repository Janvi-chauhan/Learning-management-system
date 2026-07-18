<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('courses', function (Blueprint $table) {

            if (!Schema::hasColumn('courses', 'projects')) {
                $table->json('projects')->nullable();
            }

            if (!Schema::hasColumn('courses', 'certifications')) {
                $table->json('certifications')->nullable();
            }

        });
    }

    public function down(): void
    {
        Schema::table('courses', function (Blueprint $table) {

            $table->dropColumn([
                'projects',
                'certifications'
            ]);

        });
    }
};