<?php

namespace App\Http\Controllers;

use App\Services\FcmNoticeServiceInterface;
use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Exception;
use Google\Client as GoogleClient;
class NoticeController extends Controller
{
    protected FcmNoticeServiceInterface $FcmService;
    public function __construct(FcmNoticeServiceInterface $fcmService)
    {
        error_log("run here");
        $this->FcmService = $fcmService;
    }
    public function SendMultiplesNotices(Request $request)
    {
        return $this->FcmService->sendWithPool($request->recipients);
    }
    public function SendNotice()
    {
        // Ví dụ sử dụng
        $deviceTokens = [
            'f_R7AtpyzUzIvw6UMzmWcF:APA91bHnsWxbE7HgA-XC0gcOPI0hCH34e20i80pZjB-j_wF1ZQpPFKqFM3Sg3Upcs68tPcpQ-wonCt2EpOSD0Tt52rwlgTy7jBJOpH4VoUBSh8alqG-lzIg',
            // 'DEVICE_TOKEN_2',
            // 'DEVICE_TOKEN_3',
        ];
        $fcmUrl = 'https://fcm.googleapis.com/v1/projects/myproject-b5ae1/messages:send';

        $notification = [
            'title' => "Nóng!",
            'body'  => "Phát hiện đội dev test notification = tay",
            'image' => "https://play-lh.googleusercontent.com/xXn5sQVFUalAUdjUikA6Xv9EhqCprLiEHDV0wdLzsG7GE5kvI3ZM0gXYWp5YvtjPsfQ=w480-h960-rw",
        ];

        $extraNotificationData = ["message" => $notification, "moredata" => 'dd'];

        $fcmNotification = '{
                                "message":{
                                "notification":{
                                    "title":"FCM Message",
                                    "body":"This is an FCM Message"
                                },
                                "token":"ehrPEy2FTt-EStM-wUCXx5:APA91bEXyJlw7LmkXZXMLEWpYyC7YjYCSAi9uh1dAiXeWWJgWsRHbLCWZa1dQ6bBkOMdBj0WN2iytwqmuS58xohNKGEKsurBBq0BVYGwOXh6f7v683va3No"
                            }}';

        $client = new Client();
        $response = $client->post($fcmUrl, [
            'headers' => [
                'Authorization' => 'Bearer ' . $this->getAccesstokenFcmService(),
                'Content-Type'  => 'application/json',
            ],
            'json' => json_decode($fcmNotification) //json_encode($fcmNotification),
        ]);

        if ($response->getStatusCode() !== 200) {
            throw new Exception('Failed to send notification: ' . $response->getBody());
        }

        return json_decode($response->getBody(), true);
    }

    private function getAccesstokenFcmService() {
        $serviceAccountFile = "D:\A_FPI_MOBILE_APP\C_Panel\Laravel\BE_Cpanel\poly_final_service.json";
        $scopes = ['https://www.googleapis.com/auth/firebase.messaging'];

        $client = new GoogleClient();
        $client->setAuthConfig($serviceAccountFile);
        $client->addScope($scopes);

        $token = $client->fetchAccessTokenWithAssertion();

        if (isset($token['access_token'])) {
            return $token['access_token'];
        } else {
            return "";
        }
    }
}
