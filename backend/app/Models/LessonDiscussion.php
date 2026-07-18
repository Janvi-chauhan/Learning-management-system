<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LessonDiscussion extends Model
{
    protected $fillable = [

        'lesson_id',

        'student_id',

        'message'

    ];

    public function discussions()
{
    return $this->hasMany(
        LessonDiscussion::class,
        'lesson_id'
    );
}

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}