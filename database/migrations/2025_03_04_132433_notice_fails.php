<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('notices');
        Schema::create('notices', function (Blueprint $table) {

            // $user_name, $user_code, $device_token, $title, $body, $image
            $table->id();
            $table->string(column: 'user_name');
            $table->string(column: 'user_code');
            $table->string(column: 'campus_code');
            $table->string(column: 'title');
            $table->text(column: 'body');
            $table->string(column: 'image');
            $table->string(column: 'device_token');
            $table->string(column: 'send_status')->default(value: "pending")->comment("success, fail, pending");
            $table->boolean(column: 'seen_status')->nullable()->default(value: null)->comment("new, seen, lost");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('notices');
    }
};
