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
        Schema::table('payments', function (Blueprint $table) {
             $table->foreignId('student_id')
              ->nullable()
              ->constrained('students')
              ->after('id');

        $table->string('razorpay_payment_id')
              ->nullable()
              ->after('remaining');

        $table->string('razorpay_order_id')
              ->nullable()
              ->after('razorpay_payment_id');

        $table->string('razorpay_signature')
              ->nullable()
              ->after('razorpay_order_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('payments', function (Blueprint $table) {
             $table->dropForeign(['student_id']);

        $table->dropColumn([
            'student_id',
            'razorpay_payment_id',
            'razorpay_order_id',
            'razorpay_signature'
        ]);
    });
}
};
