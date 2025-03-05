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
        Schema::dropIfExists('messages');
        Schema::create('messages', function (Blueprint $table) {

            // $user_name, $user_code, $device_token, $title, $body, $image
            $table->id();
            $table->string(column: 'user_name');
            $table->string(column: 'user_code');
            $table->string(column: 'title');
            $table->text(column: 'body');
            $table->string(column: 'image');
            $table->string(column: 'device_token');
            $table->boolean(column: 'sent_flag')->default(value: false);
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
