<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Payment;

class StudentPaymentController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,

            'data' => Payment::select(
                'id',
                'title',
                'category',
                'amount',
                'paid',
                'remaining',
                'due_date',
                'status'
            )
            ->orderBy('due_date', 'desc') 
            ->get()
        ]);
    }
    public function stats()
{
    $totalPayments =
        Payment::sum('amount');

    $paidAmount =
        Payment::sum('paid');

    $pendingAmount =
        Payment::sum('remaining');

    $liveCohorts =
        Payment::count();

    return response()->json([
        'success' => true,

        'data' => [

            'totalPayments' =>
                $totalPayments,

            'paidAmount' =>
                $paidAmount,

            'pendingAmount' =>
                $pendingAmount,

            'liveCohorts' =>
                $liveCohorts,
        ]
    ]);
}
}