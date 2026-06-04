<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function index()
    {
        return response()->json(
            Course::latest()->get()
        );
    }

    public function show($id)
    {
        return response()->json(
            Course::findOrFail($id)
        );
    }

    public function store(Request $request)
    {
        $course = Course::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Course Created Successfully',
            'data' => $course
        ]);
    }

    public function update(Request $request, $id)
    {
        $course = Course::findOrFail($id);

        $course->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Course Updated Successfully',
            'data' => $course
        ]);
    }

    public function destroy($id)
    {
        Course::findOrFail($id)->delete();

        return response()->json([
            'success' => true,
            'message' => 'Course Deleted Successfully'
        ]);
    }
}