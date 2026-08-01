<?php

namespace App\Services;

use App\Models\User;

class TeacherService
{
    /**
     * Get all teachers
     */
    public function getAllTeachers()
    {
        return User::where('role', 'teacher')
            ->orderBy('name')
            ->get();
    }

    /**
     * Find teacher by name
     */
    public function findTeacher(string $keyword)
    {
        return User::where('role', 'teacher')
            ->where('name', 'LIKE', "%{$keyword}%")
            ->first();
    }

    /**
     * Find teachers by subject
     */
    public function findBySubject(string $subject)
    {
        return User::where('role', 'teacher')
            ->where('subject', 'LIKE', "%{$subject}%")
            ->get();
    }

    /**
     * Find teachers by course
     */
    public function findByCourse(string $course)
    {
        return User::where('role', 'teacher')
            ->whereJsonContains('courses', $course)
            ->get();
    }

    /**
     * Find experienced teachers
     */
    public function experiencedTeachers($years)
    {
        return User::where('role', 'teacher')
            ->where('experience', '>=', $years)
            ->get();
    }

    /**
     * Format one teacher
     */
    public function formatTeacher(User $teacher): string
    {
        $courses = "";

        if (is_array($teacher->courses)) {
            $courses = implode(", ", $teacher->courses);
        }

        return

"Teacher Name : {$teacher->name}

Email : {$teacher->email}

Phone : {$teacher->phone}

Subject : {$teacher->subject}

Experience : {$teacher->experience}

Location : {$teacher->location}

Courses : {$courses}

";
    }

    /**
     * Format all teachers
     */
    public function formatAllTeachers(): string
    {
        $teachers = $this->getAllTeachers();

        if ($teachers->isEmpty()) {
            return "No teachers available.";
        }

        $text = "";

        foreach ($teachers as $teacher) {

            $text .= $this->formatTeacher($teacher);

            $text .=
                "\n--------------------------------------\n";
        }

        return $text;
    }

    /**
     * Build prompt for one teacher
     */
    public function buildTeacherPrompt(string $keyword)
    {
        $teacher = $this->findTeacher($keyword);

        if (!$teacher) {
            return null;
        }

        return $this->formatTeacher($teacher);
    }

    /**
     * Build prompt by subject
     */
    public function buildSubjectPrompt(string $subject)
    {
        $teachers = $this->findBySubject($subject);

        if ($teachers->isEmpty()) {
            return null;
        }

        $text = "";

        foreach ($teachers as $teacher) {

            $text .= $this->formatTeacher($teacher);

            $text .=
                "\n--------------------------------------\n";
        }

        return $text;
    }

    /**
     * Build prompt by course
     */
    public function buildCoursePrompt(string $course)
    {
        $teachers = $this->findByCourse($course);

        if ($teachers->isEmpty()) {
            return null;
        }

        $text = "";

        foreach ($teachers as $teacher) {

            $text .= $this->formatTeacher($teacher);

            $text .=
                "\n--------------------------------------\n";
        }

        return $text;
    }

    /**
     * Build prompt for all teachers
     */
    public function buildTeachersPrompt()
    {
        return $this->formatAllTeachers();
    }

    /**
     * Total teachers
     */
    public function totalTeachers(): int
    {
        return User::where('role', 'teacher')->count();
    }

    /**
     * Latest teachers
     */
    public function latestTeachers($limit = 5)
    {
        return User::where('role', 'teacher')
            ->latest()
            ->take($limit)
            ->get();
    }
}