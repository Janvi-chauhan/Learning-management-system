<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('lesson_completions', function (Blueprint $table) {

            $table->id();

            $table->unsignedBigInteger('student_id');

            $table->unsignedBigInteger('lesson_id');

            $table->timestamps();

            $table->unique([
                'student_id',
                'lesson_id'
            ]);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lesson_completions');
    }
};