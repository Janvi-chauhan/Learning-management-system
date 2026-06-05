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
    'password',
    'role',
    'subject',
    'experience',
    'status',
    'course',
    'year',
    'batch_type',
    'attendance',
    'assignments_completed',
    'total_assignments',
    'tests_completed',
    'total_tests',
];


    protected $hidden = [
        'password',
        'remember_token'
    ];
}