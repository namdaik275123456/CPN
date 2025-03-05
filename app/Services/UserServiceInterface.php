<?php
namespace App\Services;

use App\Services\BaseServiceInterface;

interface UserServiceInterface extends BaseServiceInterface
{
    /**
     * The function to save device token from mobile app.
     * Each user in database have only one device token.
     * Overwrite the current token to save new.
     * @param string $user_code The user's code.
     * @param string $device_token new device token.
     * @return \App\Models\User
     * @var string
     */
    public function saveDeviceToken($user_code, $device_token);
}
