<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\CourseLesson;
use App\Models\LessonResource;
use App\Models\LessonProgress;
use App\Models\Enrollment;
use app\Models\Student;
use Carbon\Carbon;
use App\Models\Certificate;
use Illuminate\Http\Request;


class StudentCourseController extends Controller
{
    /**
     * Get all courses
     */
    public function index()
    {
        $courses = Course::latest()->get();

        return response()->json([
            'success' => true,
            'data' => $courses,
        ]);
    }
    public function enrolledCourses()
{
    $user = auth()->user();

    $enrollments = Enrollment::with('course')
        ->where('student_id', $user->id)
        ->get();

    $courses = $enrollments->map(function ($enrollment) {

        return [
            'id' => $enrollment->course->id,
            'title' => $enrollment->course->title,
            'duration' => $enrollment->course->duration,
            'mentor_name' => $enrollment->course->mentor_name,
            'thumbnail' => $enrollment->course->thumbnail,
            'progress' => $enrollment->course->progress,
        ];
    });

    return response()->json([
        'success' => true,
        'data' => $courses
    ]);
}
public function stats()
{
    $user = auth()->user();

    return response()->json([
        'success' => true,
        'data' => [
            'enrolled' => Enrollment::where('student_id', $user->id)->count(),
            'completed' => 0,
            'liveClasses' => 0,
            'mentors' => 0,
        ]
    ]);
}

    /**
     * Get single course
     */
    public function show($id)
    {
        $course = Course::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $course,
        ]);
    }
    public function learning($id)
{
    $user = auth()->user();

    if (!$user) {
        return response()->json([
            'success' => false,
            'message' => 'User not authenticated.'
        ], 401);
    }
    
   $student = auth()->user()->student;

if (!$student) {
    return response()->json([
        'success' => false,
        'message' => 'Student record not found.'
    ], 404);
}
    $course = Course::with([

        'modules.lessons' => function ($query) {

            $query->orderBy('position');

        },

        'modules.lessons.module.course',

        'modules.lessons.resources',

        'modules.lessons.discussions.student.user'

    ])->findOrFail($id);

    $totalLessons = 0;

    $completedLessons = 0;

    foreach ($course->modules as $module) {

        $module->lesson_count = $module->lessons->count();

        foreach ($module->lessons as $lesson) {

            $lesson->completed = LessonProgress::where(

                'student_id',

                $student->id

            )

            ->where(

                'lesson_id',

                $lesson->id

            )

            ->where(

                'completed',

                true

            )

            ->exists();

            $lesson->locked = false;

            $totalLessons++;

            if ($lesson->completed) {

                $completedLessons++;

            }

        }

        $module->completed_lessons =

            $module->lessons

            ->where('completed', true)

            ->count();

    }

    $course->progress =

        $totalLessons

        ?

        round(($completedLessons / $totalLessons) * 100)

        : 0;

    return response()->json([

        'success' => true,

        'data' => $course

    ]);
}
public function joinLiveClass($courseId)
{
    $course = Course::findOrFail($courseId);

    return response()->json([
        'success' => true,
        'is_live' => $course->is_live,
        'url' => $course->live_class_url
    ]);
}
public function generateCertificate($courseId)
{
    $student = auth()->user()->student;

    $course = Course::findOrFail($courseId);

    if (!$course->certificate) {

        return response()->json([

            'message' => 'Certificate is disabled.'

        ],403);

    }

    $enrollment = Enrollment::where(

        'student_id',

        $student->id

    )

    ->where(

        'course_id',

        $courseId

    )

    ->first();

    if (!$enrollment) {

        return response()->json([

            'message' => 'Enrollment not found.'

        ],404);

    }

    $totalLessons = CourseLesson::whereHas(

        'module',

        function($q) use($courseId){

            $q->where(

                'course_id',

                $courseId

            );

        }

    )->count();

    $completedLessons = LessonProgress::where(

        'student_id',

        $student->id

    )

    ->where(

        'completed',

        true

    )

    ->whereHas(

        'lesson.module',

        function($q) use($courseId){

            $q->where(

                'course_id',

                $courseId

            );

        }

    )

    ->count();

    $progress =

        $totalLessons > 0

        ?

        round(($completedLessons/$totalLessons)*100)

        :0;

    $enrollment->update([

        'progress'=>$progress

    ]);

    if($progress < 100){

        return response()->json([

            'message'=>'Complete course first.'

        ],403);

    }

    $certificate = Certificate::firstOrCreate(

        [

            'student_id'=>$student->id,

            'course_id'=>$courseId

        ],

        [

            'certificate_no'=>'CERT-'.time(),

            'issued_at'=>Carbon::today()

        ]

    );

    return response()->json($certificate);
}

    
    /**
     * Enroll student in course
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Remove enrolled course
     */
    public function destroy($id)
    {
        //
    }
    public function notesPreview($lessonId)
{
    $lesson = CourseLesson::findOrFail($lessonId);

    $lesson->increment('notes_preview_count');

    return response()->json([
        'success'=>true
    ]);
}
public function downloadResource($resourceId)
{
    $resource =
        LessonResource::findOrFail($resourceId);

    $resource->increment(
        'download_count'
    );

    return response()->json([
        'success'=>true,
        'file'=>$resource->file
    ]);
}
public function showCertificate($id)
{

    $certificate = Certificate::with([

        'course',

        'student.user'

    ])->findOrFail($id);

    return response()->json([

        'success'=>true,

        'data'=>$certificate

    ]);

}
}