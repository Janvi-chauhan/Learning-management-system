<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CourseLesson;
use Illuminate\Http\Request;

class CourseLessonController extends Controller
{
    public function index($moduleId)
    {
        return response()->json([
            'success'=>true,
            'data'=>CourseLesson::where('module_id',$moduleId)
                ->orderBy('position')
                ->get()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'module_id'=>'required',
            'title'=>'required',
            'duration'=>'required',
            'video'=>'required'
        ]);

        $lesson=CourseLesson::create($request->all());

        return response()->json([
            'success'=>true,
            'data'=>$lesson
        ]);
    }

    public function update(Request $request,$id)
    {
        $lesson=CourseLesson::findOrFail($id);

        $lesson->update($request->all());

        return response()->json([
            'success'=>true,
            'data'=>$lesson
        ]);
    }

    public function destroy($id)
    {
        CourseLesson::findOrFail($id)->delete();

        return response()->json([
            'success'=>true
        ]);
    }
}