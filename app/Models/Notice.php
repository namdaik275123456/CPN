<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
class Notice extends Model
{

     /**
     * FCM api messages:send response success.
     */

    const SENT_SUCCESS = "success";

    /**
     * FCM api messages:send response fail.
     */
    const SENT_FAIL = "fail";

    /**
     * Wait to send.
     */
    const PENDING = "pending";
    /**
     * Table name.
     *
     * @var string
     */
    protected $table = 'notices';

     /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_name',
        'user_code',
        'campus_code',
        'device_token',
        'title',
        'body',
        'image',
        'send_status',
        'seen_status'
    ];

    /**
     * Included: title, body, image, device token
     * @var array
     */
    public $message;


    public function createMessagePayload(): array {
        $this->message = [
            "message" => [
                "notification" => [
                    'title' => $this->title,
                    'body' => $this->body,
                    'image' => $this->image
                ],
                "token" => $this->device_token
            ]
        ];
        return $this->message;
    }
}
