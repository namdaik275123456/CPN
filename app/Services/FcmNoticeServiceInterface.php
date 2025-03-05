<?php
namespace App\Services;

use App\Services\BaseServiceInterface;

interface FcmNoticeServiceInterface extends BaseServiceInterface
{
    /**
     * Add messages to the pools for sending
     * @var string
     */
    public function sendWithPool($messages);
    function getAccesstokenFcmService();
}
