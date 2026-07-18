<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('course_lessons', function (Blueprint $table) {

            $table->longText('overview')
                  ->nullable()
                  ->after('description');

            $table->string('notes_title')
                  ->nullable()
                  ->after('overview');

            $table->text('notes_description')
                  ->nullable()
                  ->after('notes_title');

            $table->string('notes_file')
                  ->nullable()
                  ->after('notes_description');

            $table->longText('assignment')
                  ->nullable()
                  ->after('notes_file');

            $table->string('assignment_file')
                  ->nullable()
                  ->after('assignment');

        });
    }

    public function down(): void
    {
        Schema::table('course_lessons', function (Blueprint $table) {

            $table->dropColumn([
                'overview',
                'notes_title',
                'notes_description',
                'notes_file',
                'assignment',
                'assignment_file'
            ]);

        });
    }
};