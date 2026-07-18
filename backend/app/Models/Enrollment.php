<?php

namespace App\Models;

use App\Models\User;
use App\Models\Course;

use Illuminate\Database\Eloquent\Model;

class Enrollment extends Model
{
    protected $fillable = [

        'student_id',
        'course_id',
        'full_name',
        'email',
        'phone',
        'city',
        'qualification',
        'amount',
        'transaction_id',
        'payment_status',

    'razorpay_order_id',

    'razorpay_payment_id',

    'razorpay_signature',

    ];
    // Relationship with Course
    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    // Relationship with Student
    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}