<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Query;
use App\Models\Project;

class TeacherProfileController extends Controller
{
    public function index(Request $request)
    {
        return response()->json([
            'success' => true,
            'data' => $request->user()
        ]);
    }

    public function update(Request $request)
{
    $user = $request->user();

    $validated = $request->validate([

        'name' => 'required|string|max:255',

        'email' => 'required|email',

        'phone' => 'nullable|string|max:20',

        'location' => 'nullable|string|max:255',

        'subject' => 'nullable|string|max:255',

        'experience' => 'nullable|string|max:255',

        'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
    ]);

    if ($request->hasFile('image')) {

        $path = $request->file('image')->store(
            'profile-images',
            'public'
        );

        $user->image = $path;
    }

    $user->update([

        'name' => $validated['name'],

        'email' => $validated['email'],

        'phone' => $validated['phone'] ?? null,

        'location' => $validated['location'] ?? null,

        'subject' => $validated['subject'] ?? null,

        'experience' => $validated['experience'] ?? null,
    ]);

    return response()->json([

        'success' => true,

        'message' => 'Profile Updated Successfully',

        'user' => $user->fresh()
    ]);
}

    /*
    |--------------------------------------------------------------------------
    | Notifications
    |--------------------------------------------------------------------------
    */

    public function notifications()
    {
        $notifications = [];

        // Student Queries

        foreach (
            Query::latest()
                ->take(5)
                ->get()
            as $query
        ) {

            $notifications[] = [

                'title' => 'New Student Query',

                'message' => substr(
                    $query->query,
                    0,
                    50
                ),

                'time' => $query->created_at
                    ->diffForHumans(),

                'type' => 'query'
            ];
        }

        // Projects

        foreach (
            Project::latest()
                ->take(5)
                ->get()
            as $project
        ) {

            $notifications[] = [

                'title' => 'Project Submitted',

                'message' => $project->title,

                'time' => $project->created_at
                    ->diffForHumans(),

                'type' => 'project'
            ];
        }

        return response()->json([

            'success' => true,

            'data' => collect($notifications)
                ->values()
        ]);
    }
}