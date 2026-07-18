<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Project;

class TeacherProjectController extends Controller
{
    /**
     * Get all projects
     */
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Project::all()
        ]);
    }

    /**
     * Update project review
     */
    public function update(Request $request, $id)
{
    try {

        $request->validate([
            'progress' => 'required|integer|min:0|max:100',
            'status' => 'required|string',
            'remarks' => 'nullable|string',
        ]);

        $project = Project::findOrFail($id);

        $project->progress = $request->progress;
        $project->status = $request->status;
        $project->remarks = $request->remarks;

        $project->save();

        return response()->json([
            'success' => true,
            'message' => 'Review Updated Successfully',
            'data' => $project
        ]);

    } catch (\Exception $e) {

        return response()->json([
            'error' => $e->getMessage(),
            'line' => $e->getLine(),
            'file' => $e->getFile(),
        ], 500);
    }
}

    /**
     * View single project
     */
    public function show($id)
    {
        $project = Project::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $project
        ]);
    }
}