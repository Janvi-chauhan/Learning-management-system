<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Course;

class LiveClassController extends Controller
{
    // ======================
    // Start Live Class
    // ======================

    public function start($courseId)
    {
        $course = Course::findOrFail($courseId);

        $roomName = str_replace(
            ' ',
            '_',
            $course->title
        ).'_'.time();

        return response()->json([

            'success'=>true,

            'room_name'=>$roomName,

            'meeting_url'=>
            "https://meet.jit.si/".$roomName

        ]);
    }

    // ======================
    // Join Live Class
    // ======================

    public function join($room)
    {
        return response()->json([

            'success'=>true,

            'meeting_url'=>
            "https://meet.jit.si/".$room

        ]);
    }
}