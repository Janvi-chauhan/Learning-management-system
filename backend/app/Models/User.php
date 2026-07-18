<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
    'name',
    'email',
    'phone',
    'courses',
    'password',
    'year',
    'batch_type',
    'role',
    'image',
    'otp',
    'otp_expiry',
    'is_verified',
   

    //Teacher Fields
    'subject',
    'experience',
    'courses',
    'status',
    'phone',
    'location',

    //Students Fields
    // 'course',
    // 'year',
    // 'batch_type',
    // 'attendance',

    // 'assignment_completed',
    // 'toatl_assignments',

    // 'tests_completed',
    // 'toatl_tests',
    
];


    protected $hidden = [
        'password',
        'remember_token'
    ];
    protected $casts = [
    'courses' => 'array',
    'is_verified' => 'boolean',
    'otp_expiry' => 'datetime',
];
 /*
    |--------------------------------------------------------------------------
    | Student Relationship
    |--------------------------------------------------------------------------
    */

    public function student()
    {
        return $this->hasOne(Student::class);
    }
}
