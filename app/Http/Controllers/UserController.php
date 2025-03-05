<?php

namespace App\Http\Controllers;

use App\Services\UserServiceInterface;
use Illuminate\Http\Request;
use App\Common\ResponseData;
class UserController extends Controller
{
    protected UserServiceInterface $UserService;
    public function __construct(UserServiceInterface $userService)
    {
        $this->UserService = $userService;
    }
    public function SaveDeviceToken(Request $request)
    {
        try {
            $user = $this->UserService->saveDeviceToken(user_code: $request->user_code, device_token: $request->device_token);
            return ResponseData::Success(data: [
                "user_code" => $user->user_code,
                "device_fcm_token" => $user->device_fcm_token
            ]);
        } catch (\Exception $e) {
            return ResponseData::Exeption(exception: $e);
        }
    }
}
