<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('students', function (Blueprint $table) {

            $table->renameColumn('batch', 'batch_type');

            $table->renameColumn('profile_image', 'image');

        });
    }

    public function down(): void
    {
        Schema::table('students', function (Blueprint $table) {

            $table->renameColumn('batch_type', 'batch');

            $table->renameColumn('image', 'profile_image');

        });
    }
};