<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Payment::latest()->get()
        ]);
    }

    public function store(Request $request)
    {
        $payment = Payment::create([
            'title' => $request->title,
            'amount' => $request->amount,
            'due_date' => $request->due_date,
            'status' => $request->status,
            'category' => $request->category,
            'paid' => $request->paid,
            'remaining' => $request->remaining,
        ]);

        return response()->json([
            'success' => true,
            'data' => $payment
        ]);
    }

    public function show($id)
    {
        return response()->json([
            'success' => true,
            'data' => Payment::findOrFail($id)
        ]);
    }

    public function update(Request $request,$id)
    {
        $payment = Payment::findOrFail($id);

        $payment->update([
            'title' => $request->title,
            'amount' => $request->amount,
            'due_date' => $request->due_date,
            'status' => $request->status,
            'category' => $request->category,
            'paid' => $request->paid,
            'remaining' => $request->remaining,
        ]);

        return response()->json([
            'success' => true,
            'data' => $payment
        ]);
    }

    public function destroy($id)
    {
        Payment::findOrFail($id)->delete();

        return response()->json([
            'success' => true
        ]);
    }
}