<?php
namespace App\Services;

use App\Services\BaseServiceInterface;

interface FcmNoticeServiceInterface extends BaseServiceInterface
{
    /**
     * Add messages to the pools for sending
     * @var string
     */
    public function sendWithPool($recipients, $campus_code);

    public function seenNotice($notice_id, $user_code);

    public function GetListNotices($user_code, $campus_code);

    function getAccesstokenFcmService();
}
