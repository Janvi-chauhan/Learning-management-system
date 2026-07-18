<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('lesson_resources', function (Blueprint $table) {

            $table->foreignId('lesson_id')
                  ->after('id')
                  ->constrained('course_lessons')
                  ->cascadeOnDelete();

            $table->string('type')
                  ->after('lesson_id');

            $table->string('title')
                  ->after('type');

            $table->text('description')
                  ->nullable()
                  ->after('title');

            $table->string('file')
                  ->after('description');

            $table->string('size')
                  ->nullable()
                  ->after('file');

            $table->boolean('preview')
                  ->default(false)
                  ->after('size');

        });
    }

    public function down(): void
    {
        Schema::table('lesson_resources', function (Blueprint $table) {

            $table->dropForeign(['lesson_id']);

            $table->dropColumn([
                'lesson_id',
                'type',
                'title',
                'description',
                'file',
                'size',
                'preview'
            ]);

        });
    }
};