<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;

class AdminTestimonialController extends Controller
{
    public function index()
    {
        return response()->json([
            'success'=>true,
            'data'=>Testimonial::latest()->get()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'=>'required',
            'course'=>'required',
            'comment'=>'required',
            'rating'=>'required',
            'image'=>'nullable'
        ]);

        $testimonial=Testimonial::create($request->all());

        return response()->json([
            'success'=>true,
            'data'=>$testimonial
        ]);
    }

    public function update(Request $request,$id)
    {
        $testimonial=Testimonial::findOrFail($id);

        $testimonial->update($request->all());

        return response()->json([
            'success'=>true,
            'data'=>$testimonial
        ]);
    }

    public function destroy($id)
    {
        Testimonial::findOrFail($id)->delete();

        return response()->json([
            'success'=>true
        ]);
    }
}