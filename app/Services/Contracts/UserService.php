<?php
namespace App\Services\Contracts;

use App\Models\User;
use App\Services\UserServiceInterface;
use Exception;
use Illuminate\Support\Facades\Log;
use Throwable;

class UserService extends BaseService implements UserServiceInterface
{
    public function saveDeviceToken($user_code, $device_token): User {
        $currentUser = User::where(
        [
            "user_code" => $user_code
        ])->update([
            "device_fcm_token" => $device_token
        ]);
        return  User::where(["user_code" => $user_code])->first();
    }
}
