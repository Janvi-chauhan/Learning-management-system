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
        Schema::create('teachers', function (Blueprint $table) {
            $table->id();
             $table->foreignId('user_id')
              ->constrained()
              ->cascadeOnDelete();

        $table->string('subject')->nullable();

        $table->integer('experience')->nullable();

        $table->json('courses')->nullable();

        $table->string('status')->default('active');

        $table->string('location')->nullable();

        $table->string('phone')->nullable();

        $table->string('image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teachers');
    }
};
