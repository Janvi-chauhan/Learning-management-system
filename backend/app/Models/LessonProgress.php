<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LessonProgress extends Model
{
    protected $table = 'lesson_progress';

    protected $fillable = [

        'student_id',
        'course_id',

        'lesson_id',

        'completed',

        'completed_at',
        'last_position',

    'last_accessed_at',

    ];

    protected $casts = [

        'completed' => 'boolean',

        'completed_at' => 'datetime'

    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function lesson()
    {
        return $this->belongsTo(CourseLesson::class,'lesson_id');
    }
}