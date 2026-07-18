<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {

            $table->id();

            $table->string('title');

            $table->decimal('amount', 10, 2);

            $table->date('due_date');

            $table->enum('status', [
                'Paid',
                'Pending',
                'Upcoming'
            ])->default('Pending');

            $table->string('category');

            $table->decimal('paid', 10, 2)->default(0);

            $table->decimal('remaining', 10, 2);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};