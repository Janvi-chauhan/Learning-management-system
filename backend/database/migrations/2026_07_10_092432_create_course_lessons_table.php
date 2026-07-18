<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('course_lessons', function (Blueprint $table) {

            $table->id();

            $table->foreignId('module_id')
                  ->constrained('course_modules')
                  ->cascadeOnDelete();

            $table->string('title');

            $table->string('duration')->nullable();

            $table->string('video');

            $table->boolean('completed')->default(false);

            $table->text('description')->nullable();

            $table->integer('position')->default(1);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('course_lessons');
    }
};