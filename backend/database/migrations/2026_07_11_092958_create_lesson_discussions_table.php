<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('lesson_discussions', function (Blueprint $table) {

            $table->id();

            $table->foreignId('lesson_id')
                  ->constrained('course_lessons')
                  ->cascadeOnDelete();

            $table->foreignId('student_id')
                  ->constrained('students')
                  ->cascadeOnDelete();

            $table->text('message');

            $table->timestamps();

        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lesson_discussions');
    }
};