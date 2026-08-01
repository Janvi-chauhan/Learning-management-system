<?php

namespace App\Services;

use App\Models\Testimonial;

class TestimonialService
{
    /**
     * Get all testimonials
     */
    public function getAllTestimonials()
    {
        return Testimonial::orderByDesc('rating')
            ->orderBy('name')
            ->get();
    }

    /**
     * Get latest testimonials
     */
    public function latestTestimonials($limit = 5)
    {
        return Testimonial::latest()
            ->take($limit)
            ->get();
    }

    /**
     * Find testimonial by student name
     */
    public function findByStudent(string $keyword)
    {
        return Testimonial::where(
            'name',
            'LIKE',
            "%{$keyword}%"
        )->first();
    }

    /**
     * Find testimonials by course
     */
    public function findByCourse(string $course)
    {
        return Testimonial::where(
            'course',
            'LIKE',
            "%{$course}%"
        )->get();
    }

    /**
     * Find testimonials by rating
     */
    public function findByRating($rating)
    {
        return Testimonial::where(
            'rating',
            '>=',
            $rating
        )->get();
    }

    /**
     * Format one testimonial
     */
    public function formatTestimonial(Testimonial $testimonial): string
    {
        return

"Student Name : {$testimonial->name}

Course : {$testimonial->course}

Rating : {$testimonial->rating}/5

Review :

{$testimonial->comment}

";
    }

    /**
     * Format all testimonials
     */
    public function formatAllTestimonials(): string
    {
        $testimonials = $this->getAllTestimonials();

        if ($testimonials->isEmpty()) {

            return "No testimonials available.";
        }

        $text = "";

        foreach ($testimonials as $testimonial) {

            $text .=
                $this->formatTestimonial($testimonial);

            $text .=
                "\n--------------------------------------\n";
        }

        return $text;
    }

    /**
     * Build prompt for one student
     */
    public function buildStudentPrompt(string $student)
    {
        $testimonial = $this->findByStudent($student);

        if (!$testimonial) {

            return null;
        }

        return $this->formatTestimonial($testimonial);
    }

    /**
     * Build prompt for one course
     */
    public function buildCoursePrompt(string $course)
    {
        $testimonials = $this->findByCourse($course);

        if ($testimonials->isEmpty()) {

            return null;
        }

        $text = "";

        foreach ($testimonials as $testimonial) {

            $text .=
                $this->formatTestimonial($testimonial);

            $text .=
                "\n--------------------------------------\n";
        }

        return $text;
    }

    /**
     * Build prompt for rating
     */
    public function buildRatingPrompt($rating)
    {
        $testimonials = $this->findByRating($rating);

        if ($testimonials->isEmpty()) {

            return null;
        }

        $text = "";

        foreach ($testimonials as $testimonial) {

            $text .=
                $this->formatTestimonial($testimonial);

            $text .=
                "\n--------------------------------------\n";
        }

        return $text;
    }

    /**
     * Build prompt for all testimonials
     */
    public function buildTestimonialsPrompt()
    {
        return $this->formatAllTestimonials();
    }

    /**
     * Average rating
     */
    public function averageRating()
    {
        return round(
            Testimonial::avg('rating'),
            1
        );
    }

    /**
     * Total testimonials
     */
    public function totalTestimonials()
    {
        return Testimonial::count();
    }
}