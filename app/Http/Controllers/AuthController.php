<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    /**
     * Register a new user
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function register(Request $request): JsonResponse
    {
        $name = $request->name;
        $email = $request->email;
        $password = $request->password;

        // Check if field is empty
        if (empty($name) or empty($email) or empty($password)) {
            return response()->json(['status' => 'error', 'message' => 'You must fill all the fields.']);
        }

        // Check if email is valid
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return response()->json(['status' => 'error', 'message' => 'You must enter a valid email.']);
        }

        // Check if user already exist
        if (User::where('email', '=', $email)->exists()) {
            return response()->json(['status' => 'error', 'message' => 'User with this email already exists.']);
        }

        // Create new user
        try {
            $user = new User();
            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = app('hash')->make($request->password);

            // Save user and log in
            if ($user->save()) {
                return $this->login($request);
            }
        } catch (Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()]);
        }
        return response()->json(['status' => 'error', 'message' => 'Something went wrong. Please try again.']);
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return JsonResponse
     */
    public function logout(): JsonResponse
    {
        auth()->logout();

        return response()->json(['status' => 'success', 'message' => 'Successfully logged out.']);
    }

    /**
     * Log the user in
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function login(Request $request): JsonResponse
    {
        $email = $request->email;
        $password = $request->password;

        // Check if email or password is empty
        if (empty($email) or empty($password)) {
            return response()->json(['status' => 'error', 'message' => 'You must provide both email and password.']);
        }

        $credentials = request(['email', 'password']);

        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['status' => 'error', 'message' => 'Invalid credentials. Please verify your email and password and try again.']);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Successful log in.',
            'user' => auth()->user(),
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }


    public function user(Request $request): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'message' => 'Retrieved user with token.',
            'user' => auth()->user()
        ]);
    }
}
