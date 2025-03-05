<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('user_campuses');

        Schema::create('users', function (Blueprint $table) {
            $table->string('user_code')->primary()->index();
            $table->string('user_email')->unique();
            $table->string('user_name');
            $table->string('device_fcm_token')->nullable();
            $table->dateTime('last_login_at')->nullable();
            $table->string('last_ip')->nullable();
            $table->timestamps();
            $table->rememberToken();
        });

        Schema::create('user_campuses', function (Blueprint $table) {
            $table->string('user_code');
            $table->string('campus_code');
            $table->boolean('use_flag')->default(false);
            $table->primary(['user_code', 'campus_code']);
        });
    }


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {

    }
};
