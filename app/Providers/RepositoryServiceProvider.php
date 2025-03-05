<?php

namespace App\Providers;

use App\Repositories\BaseRepositoryInterface;
use App\Repositories\Contracts\BaseRepository;

use App\Services\Contracts\UserService;
use App\Services\RecipientServiceInterface;
use App\Services\Contracts\RecipientService;

use App\Services\FcmNoticeServiceInterface;
use App\Services\Contracts\FcmNoticeService;

use App\Services\BaseServiceInterface;
use App\Services\Contracts\BaseService;
use App\Services\UserServiceInterface;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
  /**
   * Register services.
   *
   * @return void
   */
  public function register()
  {
    $this->app->bind(BaseRepositoryInterface::class, BaseRepository::class);
    $this->app->bind(BaseServiceInterface::class, BaseService::class);

    $this->app->bind(FcmNoticeServiceInterface::class, FcmNoticeService::class);
    $this->app->bind(RecipientServiceInterface::class, RecipientService::class);
    $this->app->bind(UserServiceInterface::class, UserService::class);
  }

  /**
   * Bootstrap services.
   *
   * @return void
   */
  public function boot()
  {
    //
  }
}
