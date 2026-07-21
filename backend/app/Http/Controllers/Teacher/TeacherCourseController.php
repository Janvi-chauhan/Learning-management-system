<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\CourseLesson;
use App\Models\CourseModule;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

// Existing models
use App\Models\LiveClass;
use App\Models\Assignment;
use App\Models\Query;
use App\Models\Schedule;

class TeacherCourseController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Course::all()
        ]);
    }

    public function stats()
    {
        return response()->json([
            'success' => true,

            'data' => [
                'liveClasses' => LiveClass::count(),
                'assignments' => Assignment::count(),
                'questions' => Query::count(),
                'schedules' => Schedule::count(),
            ]
        ]);
    }
    // Get complete course with modules & lessons
   public function show($courseId)
{
    $course = Course::with('modules.lessons')->findOrFail($courseId);

    return response()->json([
        'success' => true,
        'data' => $course
    ]);

}

    // Update course details
    public function update(Request $request, $courseId)
    {
        $course = Course::findOrFail($courseId);

        $course->update([
            'title' => $request->title,
            'description' => $request->description,
            'duration' => $request->duration,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Course updated successfully.',
            'data' => $course
        ]);
    }

    // Upload recorded lecture
   public function uploadVideo(Request $request, $courseId)
    {
        Course::findOrFail($courseId);

        $request->validate([
            'module_id' => 'required|exists:course_modules,id',
            'title' => 'required|string|max:255',
            'duration' => 'nullable|string',
            'description' => 'nullable|string',
            'video' => 'required|file|mimetypes:video/mp4,video/quicktime,video/x-msvideo,video/webm|max:512000',
        ]);

        $module = CourseModule::findOrFail($request->module_id);

        if ((int) $module->course_id !== (int) $courseId) {
            return response()->json([
                'success' => false,
                'message' => 'Module does not belong to this course.',
            ], 422);
        }

        $path = $request->file('video')->store('course-videos', 'public');
        $videoUrl = asset('storage/' . $path);

        $position = (CourseLesson::where('module_id', $request->module_id)->max('position') ?? 0) + 1;

        $lesson = CourseLesson::create([
            'module_id' => $request->module_id,
            'title' => $request->title,
            'duration' => $request->duration,
            'description' => $request->description,
            'video' => $videoUrl,
            'position' => $position,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Video uploaded successfully.',
            'data' => $lesson,
        ]);
    }

public function deleteLesson($lessonId)
{
    $lesson = CourseLesson::findOrFail($lessonId);

    $lesson->delete();

    return response()->json([
        'success'=>true
    ]);
}

    // Generate Jitsi Meet room
    public function startLiveClass($courseId)
{
    $course = Course::findOrFail($courseId);

    $room = str_replace(' ', '_', $course->title).'_'.time();

    $url = "https://meet.jit.si/".$room;

    $course->update([
        'is_live' => true,
        'live_class_url' => $url,
    ]);

    return response()->json([
        'success' => true,
        'url' => $url,
        'course' => $course->fresh()
    ]);
}
    public function playlist($courseId)
{
    $course = Course::with(
        'modules.lessons'
    )->findOrFail($courseId);

    return response()->json([
        'success'=>true,
        'data'=>$course->modules
    ]);
}
}