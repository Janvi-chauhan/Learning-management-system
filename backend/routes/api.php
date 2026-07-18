<?php

use Illuminate\Support\Facades\Route;


use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\TeacherController;
use App\Http\Controllers\Admin\StudentController;
use App\Http\Controllers\Admin\CourseController;
use App\Http\Controllers\Authentication\AuthController;
use App\Http\Controllers\Admin\PaymentController;
use App\Http\Controllers\Admin\PlacementController;
use App\Http\Controllers\Admin\ContactController;
use App\Http\Controllers\Admin\CourseModuleController;
use App\Http\Controllers\Admin\CourseLessonController;

use App\Http\Controllers\Student\StudentDashboardController;
use App\Http\Controllers\Student\StudentCourseController;
use App\Http\Controllers\Student\AssignmentController;
use App\Http\Controllers\Student\ProjectController;
use App\Http\Controllers\Student\ProfileController;
use App\Http\Controllers\Student\AssignmentSubmissionController;
use App\Http\Controllers\Student\QueryController;
use App\Http\Controllers\Student\StudentPaymentController;
use App\Http\Controllers\Student\EnrollmentController;
use App\Http\Controllers\Student\LessonProgressController;
use App\Http\Controllers\Student\LessonController;
use App\Http\Controllers\Student\LessonDiscussionController;
use App\Services\OtpMailService;

use App\Http\Controllers\Teacher\TeacherDashboardController;
use App\Http\Controllers\Teacher\TeacherCourseController;
use App\Http\Controllers\Teacher\TeacherProfileController;
use App\Http\Controllers\Teacher\TeacherAssignmentController;
use App\Http\Controllers\Teacher\TeacherProjectController;
use App\Http\Controllers\Teacher\TeacherQueryController;
// Route::get('/cloudinary-test', function () {
//     return [
//         'cloud_url' => config('cloudinary.cloud_url'),
//         'cloud_name' => env('CLOUDINARY_CLOUD_NAME'),
//         'api_key' => env('CLOUDINARY_API_KEY'),
//     ];
// });

Route::prefix('teacher')->group(function () {



});

/*
|--------------------------------------------------------------------------
| Test API
|--------------------------------------------------------------------------
*/

Route::get('/test', function () {
    return response()->json([
        'success' => true,
        'message' => 'Laravel Backend Connected'
    ]);
});

/*
|--------------------------------------------------------------------------
| Authentication
|--------------------------------------------------------------------------
*/

    Route::post('/register', [AuthController::class, 'register']);

    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/send-otp', [AuthController::class, 'sendOtp']);
    Route::post('/verify-otp', [AuthController::class, 'verifyOtp']);

Route::middleware('admin.token')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/user', [AuthController::class, 'user']);
    Route::get('/admin/notifications',
    [DashboardController::class,'notifications']);
});  

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/

Route::get(
    '/admin/dashboard',
    [DashboardController::class, 'stats']
);
Route::get(
    '/admin/activities',
    [DashboardController::class, 'activities']
);
Route::get(
    '/admin/chart-data',
    [DashboardController::class, 'chartData']
);
Route::get(
   '/admin/course-distribution',
   [DashboardController::class, 'courseDistribution']
);


/*
|--------------------------------------------------------------------------
| Teachers Management
|--------------------------------------------------------------------------
*/

Route::get(
    '/admin/teachers',
    [TeacherController::class, 'index']
);

Route::post(
    '/admin/teachers',
    [TeacherController::class, 'store']
);

Route::get(
    '/admin/teachers/{id}',
    [TeacherController::class, 'show']
);

Route::put(
    '/admin/teachers/{id}',
    [TeacherController::class, 'update']
);

Route::delete(
    '/admin/teachers/{id}',
    [TeacherController::class, 'destroy']
);

/*
|--------------------------------------------------------------------------
| Students Management
|--------------------------------------------------------------------------
*/
Route::middleware(['admin.token'])->prefix('admin')->group(function () {
    Route::get(
    '/students',
    [StudentController::class, 'index']
);

     Route::post(
    '/students',
    [StudentController::class, 'store']
);

     Route::get(
    '/students/{id}',
    [StudentController::class, 'show']
  );

     Route::put(
    '/students/{id}',
    [StudentController::class, 'update']
  );

     Route::delete(
    '/students/{id}',
    [StudentController::class, 'destroy']
  );
});

Route::post(
    '/student/enroll',
    [EnrollmentController::class,'enroll']
);

Route::post(
'/register',
[AuthController::class,'register']
);


/*
|--------------------------------------------------------------------------
| Courses Management
|--------------------------------------------------------------------------
*/

Route::get(
    '/admin/courses',
    [CourseController::class, 'index']
);

Route::post(
    '/admin/courses',
    [CourseController::class, 'store']
);

Route::get(
    '/admin/courses/{id}',
    [CourseController::class, 'show']
);

Route::put(
    '/admin/courses/{id}',
    [CourseController::class, 'update']
);

Route::delete(
    '/admin/courses/{id}',
    [CourseController::class, 'destroy']
);

/*
|--------------------------------------------------------------------------
| Course Modules
|--------------------------------------------------------------------------
*/

Route::get(
'/admin/courses/{courseId}/modules',
[CourseModuleController::class,'index']
);

Route::post(
'/admin/modules',
[CourseModuleController::class,'store']
);

Route::put(
'/admin/modules/{id}',
[CourseModuleController::class,'update']
);

Route::delete(
'/admin/modules/{id}',
[CourseModuleController::class,'destroy']
);

/*
|--------------------------------------------------------------------------
| Course Lessons
|--------------------------------------------------------------------------
*/

Route::get(
'/admin/modules/{moduleId}/lessons',
[CourseLessonController::class,'index']
);

Route::post(
'/admin/lessons',
[CourseLessonController::class,'store']
);

Route::put(
'/admin/lessons/{id}',
[CourseLessonController::class,'update']
);

Route::delete(
'/admin/lessons/{id}',
[CourseLessonController::class,'destroy']
);

/*
|--------------------------------------------------------------------------
| Payments Management
|--------------------------------------------------------------------------
*/

Route::get(
    '/admin/payments',
    [PaymentController::class, 'index']
);

Route::post(
    '/admin/payments',
    [PaymentController::class, 'store']
);

Route::get(
    '/admin/payments/{id}',
    [PaymentController::class, 'show']
);

Route::put(
    '/admin/payments/{id}',
    [PaymentController::class, 'update']
);

Route::delete(
    '/admin/payments/{id}',
    [PaymentController::class, 'destroy']
);

/*
|--------------------------------------------------------------------------
| Placements Management
|--------------------------------------------------------------------------
*/

Route::get(
    '/admin/placements',
    [PlacementController::class, 'index']
);

Route::post(
    '/admin/placements',
    [PlacementController::class, 'store']
);

Route::get(
    '/admin/placements/{id}',
    [PlacementController::class, 'show']
);

Route::put(
    '/admin/placements/{id}',
    [PlacementController::class, 'update']
);

Route::delete(
    '/admin/placements/{id}',
    [PlacementController::class, 'destroy']
   );
  /*
|--------------------------------------------------------------------------
| Public Placements
|--------------------------------------------------------------------------
*/

Route::get(
    '/placements',
    [PlacementController::class, 'index']
);

// Contact//

Route::post(
'/contact',
 [ContactController::class, 'store']);
  Route::get(
        'admin/contacts',
        [ContactController::class, 'index']
    );

    Route::delete(
        'admin/contacts/{id}',
        [ContactController::class, 'destroy']
    );

/*
|--------------------------------------------------------------------------
| Student Dashboard
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')
    ->prefix('student')
    ->group(function () {

Route::post(
    '/assignment-submissions',
    [AssignmentSubmissionController::class, 'store']
);
Route::get(
    '/assignment-stats',
    [AssignmentController::class, 'stats']
);


    /*
    |--------------------------------------------------------------------------
    | Dashboard
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/dashboard',
        [StudentDashboardController::class, 'stats']
    );

    Route::get(
    '/activities',
    [StudentDashboardController::class, 'activities']
    );

    /*
    |--------------------------------------------------------------------------
    | Profile
    |--------------------------------------------------------------------------
    */

    Route::get(
    '/profile',
    [ProfileController::class, 'index']
    );

    Route::put(
    '/profile',
    [ProfileController::class, 'update']
    );

    Route::get(
    '/queries',
    [QueryController::class,'index']
    );

    Route::post(
    '/queries',
    [QueryController::class,'store']
    );
/*
|--------------------------------------------------------------------------
| Courses
|--------------------------------------------------------------------------
*/

Route::post(
    '/courses',
    [StudentCourseController::class, 'store']
);

Route::get(
    '/courses',
    [StudentCourseController::class, 'index']
);

// PUT THESE FIRST
Route::get(
    '/courses/enrolled',
    [StudentCourseController::class, 'enrolledCourses']
);

Route::get(
    '/courses/stats',
    [StudentCourseController::class, 'stats']
);

Route::get(
    '/courses/{id}/learning',
    [StudentCourseController::class,'learning']
);

Route::get(
    '/courses/{courseId}/live',
    [StudentCourseController::class,'joinLiveClass']
);

Route::post(
    '/courses/{courseId}/certificate',
    [StudentCourseController::class,'generateCertificate']
);

// KEEP THIS LAST
Route::get(
    '/courses/{id}',
    [StudentCourseController::class, 'show']
);

Route::delete(
    '/courses/{id}',
    [StudentCourseController::class, 'destroy']
);
    /*
    |--------------------------------------------------------------------------
    | Assignments
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/assignments',
        [AssignmentController::class, 'index']
    );

    Route::post(
        '/assignments',
        [AssignmentController::class, 'store']
    );

    Route::get(
        '/assignments/{id}',
        [AssignmentController::class, 'show']
    );

    Route::put(
        '/assignments/{id}',
        [AssignmentController::class, 'update']
    );

    Route::delete(
        '/assignments/{id}',
        [AssignmentController::class, 'destroy']
    );

    /*
    |--------------------------------------------------------------------------
    | Projects
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/projects',
        [ProjectController::class, 'index']
    );

    Route::post(
        '/projects',
        [ProjectController::class, 'store']
    );

    Route::get(
        '/projects/{id}',
        [ProjectController::class, 'show']
    );

    Route::put(
        '/projects/{id}',
        [ProjectController::class, 'update']
    );

    Route::delete(
        '/projects/{id}',
        [ProjectController::class, 'destroy']
    );

    /*
    |--------------------------------------------------------------------------
    | Payments
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/payments',
        [StudentPaymentController::class, 'index']
    );
    Route::get(
    '/payments/stats',
    [StudentPaymentController::class, 'stats']
    );
    Route::post(
        '/payments/verify',
        [EnrollmentController::class, 'verifyPayment']
    );
    });

/*
|--------------------------------------------------------------------------
| Teacher Dashboard
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->prefix('teacher')->group(function () {
    Route::get(
    '/courses',
    [TeacherCourseController::class, 'index']
    );

    Route::get(
        '/dashboard',
        [TeacherDashboardController::class, 'stats']
    );
    Route::get(
    '/assignment-stats',
    [TeacherAssignmentController::class, 'stats']
);

    /*
    |--------------------------------------------------------------------------
    | Dashboard
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/dashboard',
        [TeacherDashboardController::class, 'stats']
    );
    Route::get(
    '/activities',
    [TeacherDashboardController::class, 'activities']
    );

    /*
    |--------------------------------------------------------------------------
    | Profile
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/profile',
        [TeacherProfileController::class, 'index']
    );

    Route::put(
        '/profile',
        [TeacherProfileController::class, 'update']
    );

    Route::get(
    '/queries',
    [TeacherQueryController::class,'index']
    );

    Route::put(
    '/queries/{id}/answer',
    [TeacherQueryController::class,'answer']
    );
    Route::get(
    '/notifications',
    [TeacherProfileController::class, 'notifications']
    );

    /*
    |--------------------------------------------------------------------------
    | Projects
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/projects',
        [TeacherProjectController::class, 'index']
    );

    Route::get(
        '/projects/{id}',
        [TeacherProjectController::class, 'show']
    );

    Route::put(
        '/projects/{id}',
        [TeacherProjectController::class, 'update']
    );
    
    /*
    |--------------------------------------------------------------------------
    | Courses
    |--------------------------------------------------------------------------
    */
     Route::get(
            '/courses',
            [TeacherCourseController::class,'index']
        );
           
      Route::get(
            '/courses/stats',
            [TeacherCourseController::class, 'stats']
        );
        Route::get(
'/courses/{courseId}',
[TeacherCourseController::class,'show']
);

Route::get(
'/courses/{courseId}/playlist',
[TeacherCourseController::class,'playlist']
);

Route::post(
'/courses/{courseId}/upload-video',
[TeacherCourseController::class,'uploadVideo']
);

Route::get(
'/courses/{courseId}/live',
[TeacherCourseController::class,'startLiveClass']
);
Route::delete(
'/lesson/{lessonId}',
[TeacherCourseController::class,'deleteLesson']
);
    /*
    |--------------------------------------------------------------------------
    | Assignments
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/assignments',
        [TeacherAssignmentController::class, 'index']
    );

    Route::post(
        '/assignments',
        [TeacherAssignmentController::class, 'store']
    );

    /*
    |--------------------------------------------------------------------------
    | Assignment Submissions
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/assignments/{id}/submissions',
        [TeacherAssignmentController::class, 'submissions']
    );

   Route::put(
    '/assignment-submissions/{id}/approve',
    [TeacherAssignmentController::class, 'approve']
);

Route::put(
    '/assignment-submissions/{id}/reject',
    [TeacherAssignmentController::class, 'reject']
);
});