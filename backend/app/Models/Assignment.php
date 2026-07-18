<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\AssignmentSubmission;

class Assignment extends Model
{
      protected $fillable = [
        'title',
        'course',
        'due_date',
        'status',
        'teacher_id'
    
        
    ];

     public function submissions()
{
    return $this->hasMany(
        AssignmentSubmission::class,
        'assignment_id'
    );
}
}
