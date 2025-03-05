<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
class Message extends Model
{
    /**
     * Table name.
     *
     * @var string
     */
    protected $table = 'messages';

     /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_name',
        'user_code',
        'device_token',
        'title',
        'body',
        'image'
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
