<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Placement;
use Illuminate\Http\Request;

class PlacementController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Placement::latest()->get()
        ]);
    }

    public function show($id)
    {
        return response()->json([
            'success' => true,
            'data' => Placement::findOrFail($id)
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'batch' => 'required|string|max:255',
            'domain' => 'required|string|max:255',
            'linkedin' => 'nullable|url',
            'social' => 'nullable|url',
            'image' => 'required|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);
         if ($request->hasFile('image')) {

        $path = $request
            ->file('image')
            ->store('placements', 'public');

        $validated['image'] = asset('storage/' . $path);
    }

        $placement = Placement::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Placement created successfully',
            'data' => $placement
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $placement = Placement::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'batch' => 'required|string|max:255',
            'domain' => 'required|string|max:255',
            'linkedin' => 'nullable|url',
            'social' => 'nullable|url',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

    if ($request->hasFile('image')) {

        $path = $request
            ->file('image')
            ->store('placements', 'public');

       $validated['image'] = asset('storage/' . $path);
    } else {
        unset($validated['image']);
    }

        $placement->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Placement updated successfully',
            'data' => $placement
        ]);
    }

    public function destroy($id)
    {
        Placement::findOrFail($id)->delete();

        return response()->json([
            'success' => true,
            'message' => 'Placement deleted successfully'
        ]);
    }
}