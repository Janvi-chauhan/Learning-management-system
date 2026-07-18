<?php

namespace App\Http\Controllers\Authentication;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Services\OtpMailService;
use Carbon\Carbon;

class AuthController extends Controller
{
    // REGISTER
  public function register(Request $request)
{
    return response()->json([
        'message' => 'Please verify OTP first.'
    ]);
}
public function sendOtp(Request $request)
{
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email',
        'phone' => 'required|string|max:15',
        'courses' => 'nullable|string',
        'year' => 'nullable|string|max:20',
        'password' => 'required|min:6|confirmed',
        'role' => 'required|in:student',
        
    ]);

    $otp = rand(100000, 999999);

    User::updateOrCreate(
    ['email' => $validated['email']],
    [
        'name' => $validated['name'],
        'phone' => $validated['phone'],
        'courses' => $request->courses,
        'year' => $request->year,
        'password' => Hash::make($validated['password']),
        'role' => $validated['role'],
        'otp' => $otp,
        'otp_expiry' => now()->addMinutes(10),
        'is_verified' => false,
    ]
);

    $mail = new \PHPMailer\PHPMailer\PHPMailer(true);

    try {

        $mail->isSMTP();
        $mail->Host = env('MAIL_HOST');
        $mail->SMTPAuth = true;
        $mail->Username = env('MAIL_USERNAME');
        $mail->Password = env('MAIL_PASSWORD');
        $mail->SMTPSecure = \PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = env('MAIL_PORT');

        $mail->setFrom(
            env('MAIL_FROM_ADDRESS'),
            env('MAIL_FROM_NAME')
        );

        $mail->addAddress($validated['email']);

        $mail->isHTML(true);

        $mail->Subject = 'Verify Your Email';

        $mail->Body = "
            <h2>Email Verification</h2>
            <p>Your OTP is:</p>
            <h1>{$otp}</h1>
            <p>Valid for 10 minutes.</p>
        ";

        $mail->send();

        return response()->json([
            'success' => true,
            'message' => 'OTP sent successfully.'
        ]);

    } catch (\Exception $e) {

        return response()->json([
            'success' => false,
            'message' => 'OTP sending failed',
            'error' => $e->getMessage()
        ], 500);
    }
}
public function verifyOtp(Request $request)
{
    $request->validate([
        'email' => 'required|email',
        'otp' => 'required'
    ]);

    $user = User::where('email', $request->email)->first();

    if (!$user) {
        return response()->json([
            'message' => 'User not found'
        ], 404);
    }

    if ($user->otp != $request->otp) {
        return response()->json([
            'message' => 'Invalid OTP'
        ], 400);
    }

    if (now()->greaterThan($user->otp_expiry)) {
        return response()->json([
            'message' => 'OTP expired'
        ], 400);
    }

    // Clear OTP after verification
    $user->otp = null;
    $user->otp_expiry = null;
    $user->is_verified = true;
    $user->save();
    if ($user->role === 'student') {

    Student::create([

        'user_id' => $user->id,

        'phone' => $user->phone,

        'courses' => $user->courses,

        'year' => $user->year,

        'batch_type' => null,

        'address' => null,

        'image' => $user->image,

        'attendance' => 0,

        'assignments_completed' => 0,

        'total_assignments' => 20,

        'tests_completed' => 0,

        'total_tests' => 5,

    ]);

}

    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        'success' => true,
        'message' => 'Registration successful',
        'token' => $token,
        'user' => $user
    ]);
}

public function login(Request $request)
{
    $validated = $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    /*
    ==================================
    HARD CODED ADMIN LOGIN
    ==================================
    */

    if (
    $validated['email'] === env('ADMIN_EMAIL') &&
    $validated['password'] === env('ADMIN_PASSWORD')
) {

    $admin = User::firstOrCreate(
        ['email' => env('ADMIN_EMAIL')],
        [
            'name' => env('ADMIN_NAME'),
            'password' => Hash::make(env('ADMIN_PASSWORD')),
            'role' => 'admin',
            'is_verified' => true,
        ]
    );

    // update password if changed in .env
    $admin->password = Hash::make(env('ADMIN_PASSWORD'));
    $admin->save();

    $token = $admin->createToken('admin_token')->plainTextToken;

    return response()->json([
        'success' => true,
        'message' => 'Admin login successful',
        'token' => $token,
        'user' => $admin,
    ]);
}

//         return response()->json([
//     'success' => true,
//     'message' => 'Admin login successful',

//     'token' => 'admin-token',

//     'user' => [
//         'id' => 0,
//         'name' => env('ADMIN_NAME'),
//         'email' => env('ADMIN_EMAIL'),
//         'role' => 'admin'
//     ]
// ]);
// }

    /*
    ==================================
    STUDENT LOGIN
    ==================================
    */

    $user = User::where(
        'email',
        $validated['email']
    )->first();

    if (!$user) {

        return response()->json([
            'success' => false,
            'message' => 'User not found'
        ], 404);
    }

    if (
        !Hash::check(
            $validated['password'],
            $user->password
        )
    ) {

        return response()->json([
            'success' => false,
            'message' => 'Invalid credentials'
        ], 401);
    }

    if (!$user->is_verified) {

        return response()->json([
            'success' => false,
            'message' =>
                'Please verify your email first'
        ], 403);
    }

    $token = $user
        ->createToken('auth_token')
        ->plainTextToken;

    return response()->json([
        'success' => true,
        'message' => 'Login successful',
        'token' => $token,
        'user' => $user
    ]);
}
    // LOGOUT
    public function logout(Request $request)
    {
        $request->user()
            ->currentAccessToken()
            ->delete();

        return response()->json([
            'success' => true,
            'message' => 'Logout successful',
        ]);
    }

    // CURRENT USER
    public function user(Request $request)
    {
        return response()->json([
            'success' => true,
            'user' => $request->user(),
        ]);
    }
}