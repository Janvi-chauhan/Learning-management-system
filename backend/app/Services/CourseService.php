<?php

namespace App\Services;

use App\Models\Course;

class CourseService
{
    /**
     * Get all courses
     */
    public function getAllCourses()
    {
        return Course::orderBy('title')->get();
    }

    /**
     * Get Featured Courses
     */
    public function getFeaturedCourses()
    {
        return Course::where('featured', true)->get();
    }

    /**
     * Get Latest Courses
     */
    public function getLatestCourses()
    {
        return Course::where('latest', true)->get();
    }

    /**
     * Find course by title
     */
    public function findCourse(string $keyword)
    {
        return Course::where(
            'title',
            'LIKE',
            "%{$keyword}%"
        )->first();
    }

    /**
     * Find courses by category
     */
    public function findCategory(string $category)
    {
        return Course::where(
            'category',
            'LIKE',
            "%{$category}%"
        )->get();
    }

    /**
     * Convert one course into AI prompt
     */
    public function formatCourse(Course $course): string
    {
        return

"Course Title : {$course->title}

Category : {$course->category}

Duration : {$course->duration}

Level : {$course->level}

Language : {$course->language}

Mentor : {$course->mentor_name}

Experience : {$course->mentor_experience}

Description :

{$course->description}

";
    }

    /**
     * Convert all courses into AI prompt
     */
    public function formatAllCourses()
    {
        $courses = $this->getAllCourses();

        if ($courses->isEmpty()) {

            return "No courses available.";
        }

        $text = "";

        foreach ($courses as $course) {

            $text .=

$this->formatCourse($course)

."\n------------------------------------\n";
        }

        return $text;
    }

    /**
     * Build prompt for one course
     */
    public function buildCoursePrompt(string $keyword)
    {
        $course = $this->findCourse($keyword);

        if (!$course) {

            return null;
        }

        return $this->formatCourse($course);
    }

    /**
     * Build prompt for all courses
     */
    public function buildCoursesPrompt()
    {
        return $this->formatAllCourses();
    }
}