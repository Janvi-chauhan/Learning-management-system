<?php

namespace App\Http\Controllers;

use App\Models\Testimonial;

class TestimonialController extends Controller
{
    public function index()
    {
        $testimonials = Testimonial::all();

        return response()->json([
            'success' => true,
            'data' =>Testimonial::latest()->get()
        ]);
    }
}