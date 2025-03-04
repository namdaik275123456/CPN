<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Log;

class OAuthController extends Controller
{
    public function googleCallback(Request $request)
    {
        $code = $request->input('code');

        if (!$code) {
            return response()->json(['error' => 'invalid_code'], 400);
        }

        try {
            // 🔹 1️⃣ Đổi Authorization Code lấy Access Token từ Google
            $response = Http::asForm()->post('https://oauth2.googleapis.com/token', [
                'client_id' => env('GOOGLE_CLIENT_ID'),
                'client_secret' => env('GOOGLE_CLIENT_SECRET'),
                'redirect_uri' => env('GOOGLE_REDIRECT_URI'),
                'grant_type' => 'authorization_code',
                'code' => $code,
            ]);

            $data = $response->json();

            if (!isset($data['access_token'])) {
                return response()->json(['error' => 'invalid_token', 'google_response' => $data], 400);
            }

            $accessToken = $data['access_token'];

            // 🔹 2️⃣ Lấy thông tin người dùng từ Google
            $userResponse = Http::withHeaders([
                'Authorization' => 'Bearer ' . $accessToken
            ])->get('https://www.googleapis.com/oauth2/v3/userinfo');

            $user = $userResponse->json();

            if (!isset($user['email'])) {
                return response()->json(['error' => 'user_not_found'], 400);
            }

            // 🔹 4️⃣ Trả về thông tin user
            return response()->json([
                'message' => 'Authenticated successfully',
                'user' => [
                    'name' => $user['name'] ?? null,
                    'email' => $user['email'],
                    'avatar' => $user['picture'] ?? null,
                ]
            ]);
        } catch (\Exception $e) {
            Log::error("Google OAuth Error: " . $e->getMessage());
            return response()->json(['error' => 'server_error'], 500);
        }
    }

    // 🔹 5️⃣ API kiểm tra trạng thái đăng nhập
    public function checkAuth(Request $request)
    {
        $token = $request->cookie('oauth_token');

        if (!$token) {
            return response()->json(['isAuthenticated' => false], 401);
        }

        $userResponse = Http::withHeaders([
            'Authorization' => 'Bearer ' . $token
        ])->get('https://www.googleapis.com/oauth2/v3/userinfo');

        $user = $userResponse->json();

        if (!isset($user['email'])) {
            return response()->json(['isAuthenticated' => false], 401);
        }

        return response()->json([
            'isAuthenticated' => true,
            'user' => [
                'name' => $user['name'] ?? null,
                'email' => $user['email'],
                'avatar' => $user['picture'] ?? null,
            ]
        ]);
    }

    // 🔹 6️⃣ Logout (Xóa cookie an toàn hơn)
    public function logout()
    {
        return response()->json(['message' => 'Logged out'])
            ->withCookie(Cookie::forget('oauth_token')->withPath('/'));
    }
}
