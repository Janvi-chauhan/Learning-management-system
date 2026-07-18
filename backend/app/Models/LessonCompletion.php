<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LessonCompletion extends Model
{
    protected $fillable = [
        'student_id',
        'lesson_id'
    ];
}