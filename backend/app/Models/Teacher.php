<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    protected $fillable = [

        'user_id',

        'subject',

        'experience',

        'courses',

        'status',

        'location',

        'phone',

        'image',

    ];

    protected $casts = [

        'courses' => 'array',

    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}