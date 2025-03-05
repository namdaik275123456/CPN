<?php
namespace App\Services;

use App\Services\BaseServiceInterface;

interface RecipientServiceInterface extends BaseServiceInterface
{
    public function createMessage($user_name, $user_code, $device_token, $title, $body, $image);
    function getRecipients();
}
