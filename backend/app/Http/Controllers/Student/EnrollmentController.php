<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\Enrollment;
use Illuminate\Http\Request;
use Razorpay\Api\Api;
use Razorpay\Api\Errors\SignatureVerificationError;

class EnrollmentController extends Controller
{
    public function enroll(Request $request)
    {
        $request->validate([

            'student_id' => 'required',

            'course_id' => 'required',

            'full_name' => 'required',

            'email' => 'required',

            'phone' => 'required',

            'amount' => 'required'
        ]);

        $enrollment = Enrollment::create([

            'student_id' => $request->student_id,

            'course_id' => $request->course_id,

            'full_name' => $request->full_name,

            'email' => $request->email,

            'phone' => $request->phone,

            'city' => $request->city,

            'qualification' => $request->qualification,

            'amount' => $request->amount,

            'payment_status' => 'Pending'
        ]);

        $api = new Api(
            env('RAZORPAY_KEY'),
            env('RAZORPAY_SECRET')
        );

        $order = $api->order->create([

            'receipt' => 'receipt_' . $enrollment->id,

            'amount' => $request->amount * 100,

            'currency' => 'INR',

            'payment_capture' => 1
        ]);

        return response()->json([
            'success' => true,

            'key' => env('RAZORPAY_KEY'),

            'order_id' => $order['id'],

            'amount' => $order['amount'],

            'currency' => $order['currency'],

            'enrollment_id' => $enrollment->id,

            'student_name' => $request->full_name,

            'student_email' => $request->email,

            'student_phone' => $request->phone,
        ]);
    }

    public function verifyPayment(Request $request)
    {
        $request->validate([
            'enrollment_id' => 'required',
            'razorpay_order_id' => 'required',
            'razorpay_payment_id' => 'required',
            'razorpay_signature' => 'required',
        ]);

        $api = new Api(
            env('RAZORPAY_KEY'),
            env('RAZORPAY_SECRET')
        );

        try {

            $attributes = [

                'razorpay_order_id' => $request->razorpay_order_id,

                'razorpay_payment_id' => $request->razorpay_payment_id,

                'razorpay_signature' => $request->razorpay_signature,
            ];

            $api->utility->verifyPaymentSignature($attributes);

            $enrollment = Enrollment::findOrFail(
                $request->enrollment_id
            );

            $enrollment->payment_status = 'Paid';

            $enrollment->razorpay_order_id =
                $request->razorpay_order_id;

            $enrollment->razorpay_payment_id =
                $request->razorpay_payment_id;

            $enrollment->razorpay_signature =
                $request->razorpay_signature;

            $enrollment->save();
            
            Payment::create([

    
    'title' => $enrollment->course->title,

    'amount' => $enrollment->amount,

    'due_date' => now(),

    'status' => 'Paid',

    'category' => $enrollment->course->category,

    'paid' => $enrollment->amount,

    'remaining' => 0,

    'razorpay_payment_id' => $request->razorpay_payment_id,

    'razorpay_order_id' => $request->razorpay_order_id,

    'razorpay_signature' => $request->razorpay_signature,

]);
return response()->json([
    'success' => true,
    'message' => 'Payment Verified Successfully'
]);
} catch (\Exception $e) {

    return response()->json([
        'message' => $e->getMessage(),
        'line' => $e->getLine(),
        'file' => $e->getFile(),
    ],500);

}

        //     return response()->json([
        //         'success' => true,
        //         'message' => 'Payment Verified Successfully',
        //     ]);

        // } catch (\Exception $e) {

}
    }
