<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\PartiesConfirmController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/', function () {
    return view('app');
});

Route::middleware(['auth:sanctum', config('jetstream.auth_session'), 'verified', "activity.log"])->group(function () {

});



Route::controller(LoginController::class)->group(function () {
    Route::get('login/google', 'redirectToProvider')->name('login.google');
    Route::get('login/google/callback', 'handleProviderCallback');
});
