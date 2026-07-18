<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\CourseModule;

class Course extends Model
{
    protected $fillable = [
        'title',
        'description',
        'slug',
        'category',
        'duration',
        'what_you_learn',
        'CourseRoadmap',
        'projects',
        'level',
        'language',
        'thumbnail',
        'preview_video',
        'brochure',
        'learnings',
        'roadmap',
        'certifications',
        'curriculum',
        'mentor_name',
        'mentor_experience',
        'mentor_image',
        'reviews',
        'status',
        'progress',
        'estimated_time',
        'certificate',
        'featured',
        'latest',
        'teacher_id',
        'is_live',
        'live_class_url'
    ];

    protected $casts = [
        'projects' => 'array',
        'certifications' => 'array',
        'learnings' => 'array',
        'roadmap' => 'array',
        'curriculum' => 'array',
         'reviews' => 'array',
        'featured' => 'boolean',
        'latest' => 'boolean',
        'certificate' => 'boolean',
        'is_live'=> 'boolean',
    ];
    public function enrollments()
{
    return $this->hasMany(
        \App\Models\Enrollment::class,
        'course_id'
    );
}
public function modules()
{
    return $this->hasMany(CourseModule::class)
                ->orderBy('position');
}
public function certificates()
{
    return $this->hasMany(Certificate::class);
}
}