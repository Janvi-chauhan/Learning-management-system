<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'category',
        'duration',
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
        'status',
        'featured',
        'latest',
        'teacher_id'
    ];

    protected $casts = [
        'learnings' => 'array',
        'roadmap' => 'array',
        'curriculum' => 'array',
        'reviews' => 'array',
        'featured' => 'boolean',
        'latest' => 'boolean',
    ];
}