<?php

namespace App\Services;

class ChatBotService
{
    /*
    |--------------------------------------------------------------------------
    | Dependencies
    |--------------------------------------------------------------------------
    */

    protected GeminiService $gemini;

    protected CourseService $courses;

    protected PlacementService $placements;

    protected TeacherService $teachers;

    protected TestimonialService $testimonials;

    /*
    |--------------------------------------------------------------------------
    | Intents
    |--------------------------------------------------------------------------
    */

    const INTENT_COURSE = 'course';

    const INTENT_PLACEMENT = 'placement';

    const INTENT_TEACHER = 'teacher';

    const INTENT_TESTIMONIAL = 'testimonial';

    const INTENT_ADMISSION = 'admission';

    const INTENT_CONTACT = 'contact';

    const INTENT_UNKNOWN = 'unknown';

    /*
    |--------------------------------------------------------------------------
    | Constructor
    |--------------------------------------------------------------------------
    */

    public function __construct(
        GeminiService $gemini,
        CourseService $courses,
        PlacementService $placements,
        TeacherService $teachers,
        TestimonialService $testimonials
    ) {
        $this->gemini = $gemini;

        $this->courses = $courses;

        $this->placements = $placements;

        $this->teachers = $teachers;

        $this->testimonials = $testimonials;
    }

    /*
    |--------------------------------------------------------------------------
    | Detect Intent
    |--------------------------------------------------------------------------
    */

    public function detectIntent(string $message): string
    {
        $message = strtolower(trim($message));

        if ($this->containsAny($message, [
            'course',
            'courses',
            'mern',
            'java',
            'python',
            'react',
            'frontend',
            'backend',
            'full stack',
            'curriculum',
            'training',
            'mentor'
        ])) {
            return self::INTENT_COURSE;
        }

        if ($this->containsAny($message, [

    'placement',
    'placements',
    'placed',
    'company',
    'companies',
    'job',
    'jobs',
    'salary',
    'package',
    'tcs',
    'infosys',
    'wipro',
    'accenture',
    'cognizant',
    'java',
    'python',
    'mern',
    'frontend',
    'backend',
    'full stack'

])) {

    return self::INTENT_PLACEMENT;
}

        if ($this->containsAny($message, [
            'teacher',
            'faculty',
            'trainer',
            'sir',
            'maam',
            'experience'
        ])) {
            return self::INTENT_TEACHER;
        }

        if ($this->containsAny($message, [
            'testimonial',
            'review',
            'reviews',
            'feedback',
            'rating'
        ])) {
            return self::INTENT_TESTIMONIAL;
        }

        if ($this->containsAny($message, [
            'admission',
            'register',
            'registration',
            'fee',
            'fees',
            'payment',
            'enroll'
        ])) {
            return self::INTENT_ADMISSION;
        }

        if ($this->containsAny($message, [
            'contact',
            'phone',
            'mobile',
            'email',
            'address',
            'location'
        ])) {
            return self::INTENT_CONTACT;
        }

        return self::INTENT_UNKNOWN;
    }
    /*
|--------------------------------------------------------------------------
| Reply
|--------------------------------------------------------------------------
*/

public function reply(string $message): string
{
    $intent = $this->detectIntent($message);

    switch ($intent) {

        case self::INTENT_COURSE:

            return $this->handleCourse($message);

        case self::INTENT_PLACEMENT:

            return $this->handlePlacement($message);

        case self::INTENT_TEACHER:

    return $this->handleTeacher($message);

        case self::INTENT_TESTIMONIAL:

    return $this->handleTestimonial($message);

        case self::INTENT_ADMISSION:

            return
                "For admission please contact our team.";

        case self::INTENT_CONTACT:

            return
                "Phone: +91 6203821917\nEmail: Info@Drikshainfotech.com";

        default:

            return
                "Sorry, I couldn't understand your question.";
    }
}
/*
|--------------------------------------------------------------------------
| Handle Course Queries
|--------------------------------------------------------------------------
*/

private function handleCourse(string $message): string
{
    try {


        $courseData = $this->courses->buildCoursesPrompt();

        $prompt = "

You are the AI Assistant of Creative Programming Classes.

Your job is to answer ONLY questions related to the institute.

Use ONLY the course information provided below.

Do not invent any information.

If the answer is not available in the data, politely say:

'Sorry, I couldn't find that information.'

----------------------------------------

COURSE DATA

{$courseData}

----------------------------------------

User Question:

{$message}

";

        /*
        |--------------------------------------------------------------------------
        | Ask Gemini
        |--------------------------------------------------------------------------
        */

        return $this->gemini->generateResponse($prompt);

    } catch (\Exception $e) {

        return "Sorry, something went wrong while fetching course information.";
    }
}
/*
|--------------------------------------------------------------------------
| Handle Placement Queries
|--------------------------------------------------------------------------
*/

private function handlePlacement(string $message): string
{
    try {

        $lower = strtolower($message);

        $placementData = "";

        /*
        |--------------------------------------------------------------------------
        | Search by Company
        |--------------------------------------------------------------------------
        */

        $companies = [

            "tcs",
            "infosys",
            "wipro",
            "accenture",
            "cognizant",
            "capgemini",
            "google",
            "amazon",
            "microsoft",
            "ibm",
            "hcl"

        ];

        foreach ($companies as $company) {

            if (str_contains($lower, $company)) {

                $placementData =
                    $this->placements
                        ->buildCompanyPrompt($company);

                break;
            }
        }

        /*
        |--------------------------------------------------------------------------
        | Search by Domain
        |--------------------------------------------------------------------------
        */

        if (empty($placementData)) {

            $domains = [

                "java",
                "python",
                "mern",
                "frontend",
                "backend",
                "full stack",
                "react",
                "node"

            ];

            foreach ($domains as $domain) {

                if (str_contains($lower, $domain)) {

                    $placementData =
                        $this->placements
                            ->buildDomainPrompt($domain);

                    break;
                }
            }
        }

        /*
        |--------------------------------------------------------------------------
        | Default
        |--------------------------------------------------------------------------
        */

        if (empty($placementData)) {

            $placementData =
                $this->placements
                    ->buildPlacementsPrompt();
        }

        /*
        |--------------------------------------------------------------------------
        | No Data
        |--------------------------------------------------------------------------
        */

        if (!$placementData) {

            return "Sorry, no placement information is available.";
        }

        /*
        |--------------------------------------------------------------------------
        | Gemini Prompt
        |--------------------------------------------------------------------------
        */

        $prompt = "

You are the AI Assistant of Creative Programming Classes.

Answer ONLY using the placement information below.

Never make up any company, package, student, or placement details.

If the answer is not present, politely say:

'Sorry, I couldn't find that placement information.'

---------------------------------------

PLACEMENT DATA

{$placementData}

---------------------------------------

User Question

{$message}

Give a short, professional, and helpful answer.

";

        return
            $this->gemini
                ->generateResponse($prompt);

    }

    catch (\Exception $e) {

        return "Unable to fetch placement information at the moment.";
    }
}
/*
|--------------------------------------------------------------------------
| Handle Teacher Queries
|--------------------------------------------------------------------------
*/

private function handleTeacher(string $message): string
{
    try {

        $lower = strtolower($message);

        $teacherData = "";

        /*
        |--------------------------------------------------------------------------
        | Search by Subject
        |--------------------------------------------------------------------------
        */

        $subjects = [

            "java",
            "python",
            "mern",
            "react",
            "node",
            "php",
            "laravel",
            "javascript",
            "html",
            "css",
            "mysql"

        ];

        foreach ($subjects as $subject) {

            if (str_contains($lower, $subject)) {

                $teacherData =
                    $this->teachers
                        ->buildSubjectPrompt($subject);

                break;
            }
        }

        /*
        |--------------------------------------------------------------------------
        | Search by Teacher Name
        |--------------------------------------------------------------------------
        */

        if (empty($teacherData)) {

            $teachers = $this->teachers->getAllTeachers();

            foreach ($teachers as $teacher) {

                if (
                    str_contains(
                        $lower,
                        strtolower($teacher->name)
                    )
                ) {

                    $teacherData =
                        $this->teachers
                            ->buildTeacherPrompt($teacher->name);

                    break;
                }
            }

        }

        /*
        |--------------------------------------------------------------------------
        | Search by Course
        |--------------------------------------------------------------------------
        */

        if (empty($teacherData)) {

            $courses = [

                "full stack",
                "frontend",
                "backend",
                "java",
                "python",
                "mern",
                "react",
                "node",
                "laravel"

            ];

            foreach ($courses as $course) {

                if (str_contains($lower, $course)) {

                    $teacherData =
                        $this->teachers
                            ->buildCoursePrompt($course);

                    break;
                }
            }

        }

        /*
        |--------------------------------------------------------------------------
        | Show All Teachers
        |--------------------------------------------------------------------------
        */

        if (empty($teacherData)) {

            $teacherData =
                $this->teachers
                    ->buildTeachersPrompt();
        }

        /*
        |--------------------------------------------------------------------------
        | No Teachers Found
        |--------------------------------------------------------------------------
        */

        if (!$teacherData) {

            return "Sorry, no teacher information is available.";
        }

        /*
        |--------------------------------------------------------------------------
        | Build Gemini Prompt
        |--------------------------------------------------------------------------
        */

        $prompt = "

You are the AI Assistant of Creative Programming Classes.

Answer ONLY using the teacher information below.

Do not make up any information.

If the answer is not available, politely say:

'Sorry, I couldn't find that teacher information.'

----------------------------------------

TEACHER DATA

{$teacherData}

----------------------------------------

User Question

{$message}

Give a short, professional and friendly answer.

";

        return $this->gemini->generateResponse($prompt);

    }

    catch (\Exception $e) {

        return "Unable to fetch teacher information.";
    }
}
/*
|--------------------------------------------------------------------------
| Handle Testimonial Queries
|--------------------------------------------------------------------------
*/

private function handleTestimonial(string $message): string
{
    try {

        $lower = strtolower($message);

        $testimonialData = "";

        /*
        |--------------------------------------------------------------------------
        | Search by Rating
        |--------------------------------------------------------------------------
        */

        if (
            str_contains($lower, "5 star") ||
            str_contains($lower, "5-star") ||
            str_contains($lower, "five star") ||
            str_contains($lower, "best review") ||
            str_contains($lower, "top review")
        ) {

            $testimonialData =
                $this->testimonials
                    ->buildRatingPrompt(5);
        }

        /*
        |--------------------------------------------------------------------------
        | Search by Course
        |--------------------------------------------------------------------------
        */

        if (empty($testimonialData)) {

            $courses = [

                "java",
                "python",
                "mern",
                "react",
                "node",
                "frontend",
                "backend",
                "full stack",
                "laravel"

            ];

            foreach ($courses as $course) {

                if (str_contains($lower, $course)) {

                    $testimonialData =
                        $this->testimonials
                            ->buildCoursePrompt($course);

                    break;
                }
            }
        }

        /*
        |--------------------------------------------------------------------------
        | Search by Student Name
        |--------------------------------------------------------------------------
        */

        if (empty($testimonialData)) {

            $students =
                $this->testimonials
                    ->getAllTestimonials();

            foreach ($students as $student) {

                if (
                    str_contains(
                        $lower,
                        strtolower($student->name)
                    )
                ) {

                    $testimonialData =
                        $this->testimonials
                            ->buildStudentPrompt($student->name);

                    break;
                }
            }
        }

        /*
        |--------------------------------------------------------------------------
        | Show All Testimonials
        |--------------------------------------------------------------------------
        */

        if (empty($testimonialData)) {

            $testimonialData =
                $this->testimonials
                    ->buildTestimonialsPrompt();
        }

        /*
        |--------------------------------------------------------------------------
        | No Testimonials Found
        |--------------------------------------------------------------------------
        */

        if (!$testimonialData) {

            return "Sorry, no testimonial information is available.";
        }

        /*
        |--------------------------------------------------------------------------
        | Gemini Prompt
        |--------------------------------------------------------------------------
        */

        $prompt = "

You are the AI Assistant of Creative Programming Classes.

Answer ONLY using the testimonial information below.

Never invent student names or reviews.

If the requested information is unavailable, politely reply:

'Sorry, I couldn't find that testimonial.'

----------------------------------------

TESTIMONIAL DATA

{$testimonialData}

----------------------------------------

User Question

{$message}

Give a short, friendly and professional answer.

";

        return
            $this->gemini
                ->generateResponse($prompt);

    }

    catch (\Exception $e) {

        return "Unable to fetch testimonial information.";
    }
}

    /*
    |--------------------------------------------------------------------------
    | Helper
    |--------------------------------------------------------------------------
    */

    private function containsAny(string $message, array $keywords): bool
    {
        foreach ($keywords as $keyword) {

            if (str_contains($message, strtolower($keyword))) {

                return true;
            }
        }

        return false;
    }

    /*
    |--------------------------------------------------------------------------
    | Debug
    |--------------------------------------------------------------------------
    */

    public function getIntentName(string $intent): string
    {
        return match ($intent) {

            self::INTENT_COURSE => 'Course',

            self::INTENT_PLACEMENT => 'Placement',

            self::INTENT_TEACHER => 'Teacher',

            self::INTENT_TESTIMONIAL => 'Testimonial',

            self::INTENT_ADMISSION => 'Admission',

            self::INTENT_CONTACT => 'Contact',

            default => 'Unknown',
        };
    }
}