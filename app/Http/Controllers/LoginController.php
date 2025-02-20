<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;

class LoginController extends Controller
{
    public function redirectToProvider()
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleProviderCallback()
    {
        $user = Socialite::driver('google')->user();
        $user_email = $user->getEmail();
        $user = User::where('email', $user_email)->first();
        if (!$user) {
            return redirect()->route('login')->with('error', 'Không tồn tại tài khoản');
        }
        Auth::loginUsingId($user->id);

        return redirect()->route('dashboard');
    }
}
