<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LessonResource extends Model
{
    protected $fillable = [

        'lesson_id',

        'type',

        'title',

        'description',

        'file',

        'size',

        'preview'
    ];

    public function lesson()
    {
        return $this->belongsTo(CourseLesson::class,'lesson_id');
    }
}