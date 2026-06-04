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
        Schema::table('courses', function (Blueprint $table) {

            $table->string('slug')->nullable()->after('title');
            $table->string('category')->nullable()->after('slug');

            $table->string('level')->nullable()->after('duration');
            $table->string('language')->nullable()->after('level');

            $table->text('thumbnail')->nullable()->after('language');
            $table->text('preview_video')->nullable()->after('thumbnail');
            $table->text('brochure')->nullable()->after('preview_video');

            $table->json('learnings')->nullable()->after('brochure');
            $table->json('roadmap')->nullable()->after('learnings');
            $table->json('curriculum')->nullable()->after('roadmap');

            $table->string('mentor_name')->nullable()->after('curriculum');
            $table->string('mentor_experience')->nullable()->after('mentor_name');
            $table->text('mentor_image')->nullable()->after('mentor_experience');

            $table->json('reviews')->nullable()->after('mentor_image');

            $table->boolean('featured')->default(false)->after('status');
            $table->boolean('latest')->default(true)->after('featured');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('courses', function (Blueprint $table) {

            $table->dropColumn([
                'slug',
                'category',
                'level',
                'language',
                'thumbnail',
                'preview_video',
                'brochure',
                'learnings',
                'roadmap',
                'curriculum',
                'mentor_name',
                'mentor_experience',
                'mentor_image',
                'reviews',
                'featured',
                'latest'
            ]);
        });
    }
};