<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::table('courses', function (Blueprint $table) {

        $table->integer('progress')->default(0);

        $table->string('estimated_time')->nullable();

        $table->boolean('certificate')->default(true);

    });
}

    /**
     * Reverse the migrations.
     */
    public function down()
{
    Schema::table('courses', function (Blueprint $table) {

        $table->dropColumn([
            'progress',
            'estimated_time',
            'certificate'
        ]);

    });
}
};
