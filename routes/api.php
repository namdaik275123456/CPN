<?php

use App\Http\Controllers\NoticeController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\OAuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/SendNotice', [NoticeController::class, 'SendNotice']);
Route::post('/SendMultiplesNotices', [NoticeController::class, 'SendMultiplesNotices']);
Route::post('/saveDeviceToken', [UserController::class, 'SaveDeviceToken']);


Route::group(['prefix' => 'notice'], function () {
    Route::group(['prefix' => 'mobile'], function () {
        Route::post('/seen', [NoticeController::class, 'SeenNotice']);
    });

    Route::get('/get-list-by-student', [NoticeController::class, 'GetListNoticeSent']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/oauth/google/callback', [OAuthController::class, 'googleCallback']);
