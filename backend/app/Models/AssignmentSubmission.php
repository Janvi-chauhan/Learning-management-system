<?php

namespace App\Models;

use App\Models\User;
use App\Models\Assignment;
use Illuminate\Database\Eloquent\Model;


class AssignmentSubmission extends Model

{
    protected $fillable = [
        'assignment_id',
        'student_id',
        'file',
        'status'
    ];

    public function student()
{
    return $this->belongsTo(
        User::class,
        'student_id'
    );
}
 public function assignment()
    {
        return $this->belongsTo(Assignment::class);
    }
}