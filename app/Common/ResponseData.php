<?php

namespace App\Common;

use App\Http\Controllers\Controller;
use App\Models\User;
use Http;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;

class ResponseData
{
    public static function Success($data, $status_code = 200) {
        return [
            "message" => "Success",
            "status_code" => $status_code,
            "data" => $data
        ];
    }

    public static function Fail($data, $status_code = 500) {
        return [
            "message" => "fail",
            "status_code" => $status_code,
            "data" => $data
        ];
    }

    public static function Exeption(\Exception $exception, $status_code = 500) {
        return [
            "message" => $exception->getMessage(),
            "status_code" => $status_code,
            "data" => [
                "line" => $exception->getLine(),
                "file" => $exception->getFile(),
                "trace" => $exception->getTrace()
            ]
        ];
    }
}
