<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CourseLesson extends Model
{
    protected $fillable = [

    'module_id',

    'title',

    'duration',

    'video',

    'completed',

    'description',

    'overview',

    'notes_title',

    'notes_description',

    'notes_file',

    'assignment',

    'assignment_file',

    'position'
];

    public function module()
    {
        return $this->belongsTo(CourseModule::class,'module_id');
    }
    public function progress()
{
    return $this->hasMany(LessonProgress::class,'lesson_id');
}
public function resources()
{
    return $this->hasMany(LessonResource::class,'lesson_id');
}
public function discussions()
{
    return $this->hasMany(
        LessonDiscussion::class,
        'lesson_id'
    );
}
}