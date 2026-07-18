<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Project::all()
        ]);
    }

    public function store(Request $request)
    {
        $project = Project::create([

            'title' => $request->title,

            'description' => $request->description,

            'tech_stack' => $request->tech_stack,

            'status' => 'Pending',

            'deadline' => $request->deadline,

            'team_size' => $request->team_size ?? 0,

            'progress' => 0,

            'student_id' => auth()->id()
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Project Added Successfully',
            'data' => $project
        ]);
    }

    public function show($id)
    {
        return response()->json([
            'success' => true,
            'data' => Project::findOrFail($id)
        ]);
    }

    public function update(Request $request, $id)
    {
        $project = Project::findOrFail($id);

        $project->update([

            'title' => $request->title,

            'description' => $request->description,

            'tech_stack' => $request->tech_stack,

            'status' => $request->status,

            'deadline' => $request->deadline,

            'team_size' => $request->team_size,

            'progress' => $request->progress
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Project Updated Successfully',
            'data' => $project
        ]);
    }

    public function destroy($id)
    {
        Project::findOrFail($id)->delete();

        return response()->json([
            'success' => true,
            'message' => 'Project Deleted Successfully'
        ]);
    }
}