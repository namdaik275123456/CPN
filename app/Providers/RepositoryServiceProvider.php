<?php

namespace App\Providers;

use App\Repositories\ActivityRepositoryInterface;
use App\Repositories\BaseRepositoryInterface;
use App\Repositories\Contracts\ActivityRepository;
use App\Repositories\Contracts\BaseRepository;
use App\Services\ActivityServiceInterface;
use App\Services\BaseServiceInterface;
use App\Services\Contracts\ActivityService;
use App\Services\Contracts\BaseService;
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

    $this->app->bind(ActivityServiceInterface::class, ActivityService::class);
    $this->app->bind(ActivityRepositoryInterface::class, ActivityRepository::class);
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
