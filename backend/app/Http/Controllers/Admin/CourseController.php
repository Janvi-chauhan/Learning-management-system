<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\CourseModule;
use App\Models\CourseLesson;
use App\Models\LessonResource;
use App\Models\Certificate;
use App\Models\LessonProgress;
use App\Models\Enrollment;
use Carbon\Carbon;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function index()
    {$courses = Course::withCount([
    'enrollments as students' => function ($query) {

        $query->where(
            'payment_status',
            'Paid'
        );

    }
])->latest()->get();

        return response()->json([
            'success' => true,
            'data' => $courses
        ]);
    }

   public function show($id)
{
    $course = Course::with([
        'modules.lessons.resources'
    ])->findOrFail($id);
    $totalLessons = 0;

$completedLessons = 0;

foreach($course->modules as $module){

    foreach($module->lessons as $lesson){

        $totalLessons++;

        if($lesson->completed){

            $completedLessons++;

        }

    }

}

$course->progress =

$totalLessons

? round(($completedLessons/$totalLessons)*100)

:0;

    return response()->json([
        'success' => true,
        'data' => $course
    ]);
}

    public function store(Request $request)
    {
        $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'nullable|string',
        'what_you_learn' => 'nullable|string',
        'CourseRoadmap' => 'nullable|string',
    ]);

        $course = Course::create($request->all());
        if ($request->has('modules')) {

    foreach ($request->modules as $moduleIndex => $module) {

        $newModule = CourseModule::create([
            'course_id' => $course->id,
            'title' => $module['title'],
            'position' => $moduleIndex + 1,
        ]);

        if (!empty($module['lessons'])) {

            foreach ($module['lessons'] as $lessonIndex => $lesson) {

        $createdLesson = CourseLesson::create([

    'module_id' => $newModule->id,

    'title' => $lesson['title'],

    'duration' => $lesson['duration'],

    'video' => $lesson['video'],

    'description' => $lesson['description'] ?? null,

    'overview' => $lesson['overview'] ?? null,

    'notes_title' => $lesson['notes_title'] ?? null,

    'notes_description' => $lesson['notes_description'] ?? null,

    'notes_file' => $lesson['notes_file'] ?? null,

    'assignment' => $lesson['assignment'] ?? null,

    'assignment_file' => $lesson['assignment_file'] ?? null,

    'position' => $lessonIndex + 1,

]);
if (!empty($lesson['resources'])) {

    foreach ($lesson['resources'] as $resource) {

        LessonResource::create([

            'lesson_id' => $createdLesson->id,

            'title' => $resource['title'],

            'type' => $resource['type'],

            'file' => $resource['file'],

        ]);

    }

}

            }

        }

    }

}

        return response()->json([
            'success' => true,
            'message' => 'Course Created Successfully',
            'data' => $course,
            'what_you_learn' => 'nullable|string',
            'CourseRoadmap' => 'nullable|string',
            'projects' => $request->projects,
            'certfications' => $request->certifications,

        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'nullable|string',
        'what_you_learn' => 'nullable|string',
        'CourseRoadmap' => 'nullable|string',
    ]);
        $course = Course::findOrFail($id);

        $course->update($request->all());
        {
        $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'nullable|string',
        'what_you_learn' => 'nullable|string',
        'CourseRoadmap' => 'nullable|string',
    ]);
        $course = Course::findOrFail($id);

        $course->update($request->all());
        CourseModule::where('course_id', $course->id)->delete();

if ($request->has('modules')) {

    foreach ($request->modules as $moduleIndex => $module) {

        $newModule = CourseModule::create([
            'course_id' => $course->id,
            'title' => $module['title'],
            'position' => $moduleIndex + 1,
        ]);

        if (!empty($module['lessons'])) {

            foreach ($module['lessons'] as $lessonIndex => $lesson) {

              $createdLesson = CourseLesson::create([

    'module_id' => $newModule->id,

    'title' => $lesson['title'],

    'duration' => $lesson['duration'],

    'video' => $lesson['video'],

    'description' => $lesson['description'] ?? null,

    'overview' => $lesson['overview'] ?? null,

    'notes_title' => $lesson['notes_title'] ?? null,

    'notes_description' => $lesson['notes_description'] ?? null,

    'notes_file' => $lesson['notes_file'] ?? null,

    'assignment' => $lesson['assignment'] ?? null,

    'assignment_file' => $lesson['assignment_file'] ?? null,

    'position' => $lessonIndex + 1,

]);
if (!empty($lesson['resources'])) {

    foreach ($lesson['resources'] as $resource) {

        LessonResource::create([

            'lesson_id' => $createdLesson->id,

            'title' => $resource['title'],

            'type' => $resource['type'],

            'file' => $resource['file'] ?? "",
            'description' => $resource['description'] ?? null,
             'size'=> $resource['size'] ?? null,
             'preview' => $resource['preview'] ?? false,

        ]);

    }

}
            }
        }
    }
}

        return response()->json([
            'success' => true,
            'message' => 'Course Updated Successfully',
            'data' => $course,
            'what_you_learn' => 'nullable|string',
            'CourseRoadmap' => 'nullable|string',
            'projects' => $request->projects,
            'certifications' => $request->certifications,
        ]);
    }


        return response()->json([
            'success' => true,
            'message' => 'Course Updated Successfully',
            'data' => $course,
            'what_you_learn' => 'nullable|string',
            'CourseRoadmap' => 'nullable|string',
            'projects' => $request->projects,
            'certifications' => $request->certifications,
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