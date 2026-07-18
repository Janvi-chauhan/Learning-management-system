<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CourseModule;
use Illuminate\Http\Request;

class CourseModuleController extends Controller
{
    public function index($courseId)
    {
        return response()->json([
            'success'=>true,
            'data'=>CourseModule::where('course_id',$courseId)
                    ->orderBy('position')
                    ->get()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'course_id'=>'required',
            'title'=>'required',
            'position'=>'required'
        ]);

        $module=CourseModule::create($request->all());

        return response()->json([
            'success'=>true,
            'data'=>$module
        ]);
    }

    public function update(Request $request,$id)
    {
        $module=CourseModule::findOrFail($id);

        $module->update($request->all());

        return response()->json([
            'success'=>true,
            'data'=>$module
        ]);
    }

    public function destroy($id)
    {
        CourseModule::findOrFail($id)->delete();

        return response()->json([
            'success'=>true
        ]);
    }
}