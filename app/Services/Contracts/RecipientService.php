<?php
namespace App\Services\Contracts;

use App\Models\Notice;
use App\Services\RecipientServiceInterface;
use Exception;
use Illuminate\Support\Facades\Log;
use Throwable;
use Google\Client as GoogleClient;
use GuzzleHttp\Pool;
class RecipientService extends BaseService implements RecipientServiceInterface
{
    /**
     * The list of devices that will receive the message.
     * @var Notice[] An array of Message objects
     */
    private $recipients = [

    ];

    public function __construct()
    {
        // $token = $this->getAccesstokenFcmService();
        // if (empty($token)) {
        //     throw new Exception("The FCM token cannot be generated.");
        // }
    }

    /**
     * The function to create a message.
     * @param string $user_name The user's name.
     * @param string $user_code The user's code.
     * @param string $device_token The device token.
     * @param string $title The message title.
     * @param string $body The message body.
     * @param string $image The message image URL.
     * @return Notice The Message object.
     */
    public function createMessage($user_name, $user_code, $campus_code, $device_token, $title, $body, $image): Notice {
        $this->recipients[] = Notice::create(attributes: [
            "user_name" => $user_name,
            "user_code" => $user_code,
            "campus_code" => $campus_code,
            "device_token" => $device_token,
            "title" => $title,
            "body" => $body,
            "image" => $image,
            "send_status" => Notice::PENDING,
            "seen_status" => null
        ]);
        return $this->recipients[count(value: $this->recipients) - 1];
    }

    /**
     * Xóa một phần tử khỏi mảng $recipients
     * @param Notice $message The message object to remove
     */
    public function removeRecipient(Notice $message)
    {
        foreach ($this->recipients as $key => $recipient) {
            if ($recipient == $message) {
                unset($this->recipients[$key]);
                $this->recipients = array_values($this->recipients);
                break;
            }
        }
    }

    /**
     * The function to return a list of recipients.
     * @return Notice[] An array of Message objects representing the recipients.
     */
    public function getRecipients(): array {
        return $this->recipients;
    }

    /**
     * The function to return a list of recipients.
     * @return Notice[] An array of Message objects representing the recipients.
     */
    public function seenNotice(): array {

        return [];
    }

    /**
     * The function to return a list of Notices .
     * @return Notice[] An array of Message objects representing the recipients.
     */
    public function getNotices($user_code, $campus_code): array {
        //Notice::query()->where("send_status", true)->order
        return [];
    }
}
?>
