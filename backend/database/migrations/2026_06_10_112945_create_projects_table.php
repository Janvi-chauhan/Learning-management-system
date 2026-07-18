<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {

            $table->id();

            $table->string('title');

            $table->text('description')->nullable();

            $table->string('tech_stack')->nullable();

            $table->string('status')
                  ->default('Pending');

            $table->date('deadline')->nullable();

            $table->integer('team_size')
                  ->default(0);

            $table->integer('progress')
                  ->default(0);
            $table->text('remarks')
                   ->nullable();

            $table->foreignId('student_id')
                  ->nullable()
                  ->constrained('users')
                  ->onDelete('cascade');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};