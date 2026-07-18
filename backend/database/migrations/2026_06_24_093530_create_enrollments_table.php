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
        Schema::create('enrollments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')
              ->constrained('users')
              ->onDelete('cascade');

        $table->foreignId('course_id')
              ->constrained('courses')
              ->onDelete('cascade');

        $table->string('full_name');

        $table->string('email');

        $table->string('phone');

        $table->string('city')->nullable();

        $table->string('qualification')->nullable();

        $table->string('payment_status')
              ->default('Pending');

        $table->decimal('amount',10,2);

        $table->string('transaction_id')
              ->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('enrollments');
    }
};
