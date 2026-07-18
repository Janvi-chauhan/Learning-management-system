<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $fillable = [

    'user_id',

    'phone',

    'courses',

    'year',

    'batch_type',
    
    'address',

    'image',

    'attendance',

    'assignments_completed',

    'total_assignments',

    'tests_completed',

    'total_tests',

];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function lessonProgress()
{
    return $this->hasMany(LessonProgress::class);
}
public function certificates()
{
    return $this->hasMany(Certificate::class);
}
}
