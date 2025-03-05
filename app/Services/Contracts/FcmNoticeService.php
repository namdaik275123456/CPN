<?php
namespace App\Services\Contracts;

use App\Models\Message;
use App\Services\FcmNoticeServiceInterface;
use App\Services\RecipientServiceInterface;
use Exception;
use Illuminate\Support\Facades\Log;
use Throwable;
use Google\Client as GoogleClient;
use GuzzleHttp\Client;
use GuzzleHttp\Pool;
use GuzzleHttp\Psr7\Request;
use GuzzleHttp\Exception\RequestException;
use App\Models\User;
class FcmNoticeService extends BaseService implements FcmNoticeServiceInterface
{
    /**
     * The number of seconds to wait after each
     * failed attempt to send a request to the FCM server.
     * 0 is not retry.
     * @var int
     */
    public $retry_interval = 0;

    /**
     * The number of message in a pool
     * @var int
     */
    private $chunk = 200;

     /**
     * The URL to access file service.
     * Get default value from env variable
     * @var string
     */
    private $file_path = "";

    /**
     * Token to authorize for fcm api
     * @var string
     */
    private $auth_token = "";

    protected RecipientServiceInterface $RecipientService;

    public function __construct(RecipientServiceInterface $recipientService)
    {
        $this->RecipientService = $recipientService;
        $this->file_path = env("FIREBASE_CREDENTIALS", "");
        $this->auth_token = $this->getAccesstokenFcmService();
        dd($this->auth_token);
        if (empty($this->auth_token)) {
            throw new Exception("The FCM token cannot be generated.");
        }
    }

    public function sendWithPool($recipients) {
        $client = new Client();

        foreach ($recipients as $key => $mess) {
            $this->RecipientService->createMessage(
                user_name: $mess["user_name"],
                user_code: $mess["user_code"],
                device_token: ($mess["device_token"] == "") ? User::where(["user_code" => $mess["user_code"]])->first()->device_fcm_token : $mess["device_token"],
                title: $mess["message"]["title"],
                body: $mess["message"]["body"],
                image: $mess["message"]["image"]
            );
        }

        $listMessage = $this->RecipientService->getRecipients();
        $requests = function ($messages) {
            foreach ($messages as $message) {
                yield new Request('POST', 'https://fcm.googleapis.com/v1/projects/cpanel-dev-edb04/messages:send', [
                    'Content-Type' => 'application/json',
                    'Authorization' => 'Bearer ' . $this->auth_token
                ], json_encode($message->createMessagePayload()));
            }
        };

        $pool = new Pool($client, $requests($listMessage), [
            'concurrency' => 5,  // Số lượng request đồng thời tối đa
            'fulfilled' => function ($response, $index) use ($listMessage) {
                error_log( "Request {$index} đã thực hiện thành công.\n");
                $listMessage[$index]->sent_flag = 1;
                $listMessage[$index]->save();
            },
            'rejected' => function (RequestException $reason, $index) use ($listMessage) {
                error_log( "Request {$index} bị từ chối: {$reason->getMessage()}\n");
                $listMessage[$index]->sent_flag = 1;
                $listMessage[$index]->save();
            },
        ]);

        // Bắt đầu xử lý
        $promise = $pool->promise();
        $promise->wait();

        return  $this->RecipientService->getRecipients();
    }

    function getAccesstokenFcmService() {
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
