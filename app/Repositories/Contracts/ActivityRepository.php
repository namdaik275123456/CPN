<?php

namespace App\Repositories\Contracts;

use App\Models\Activity;
use App\Repositories\ActivityRepositoryInterface;
use App\Repositories\Contracts\BaseRepository;
use Illuminate\Contracts\Foundation\Application;

class ActivityRepository extends BaseRepository implements ActivityRepositoryInterface
{
    public function __construct(Application $app)
    {
        parent::__construct($app);
    }

    public function model()
    {
        return Activity::class;
    }
    /**
     * Filter by ip address
     * @param string $ipAddress
     * 
     * @return $this
     */
    public function filterByIpAddress(string $ipAddress)
    {
        return $this->where([['ip_address', '=', $ipAddress]]);
    }

    /**
     * Filter by username
     * @param string $username
     * 
     * @return $this
     */
    public function filterByUsername(string $username)
    {
        return $this->where([['username', '=', $username]]);
    }

    /**
     * Filter by url
     * @param string $url
     * 
     * @return $this
     */
    public function filterByUrl(string $url)
    {
        return $this->where([['url', '=', $url]]);
    }

    /**
     * Filter by method
     * @param string $method
     * 
     * @return $this
     */
    public function filterByMethod(string $method)
    {
        return $this->where([['method', '=', $method]]);
    }


    /**
     * Filter by browser
     * @param string $browser
     * 
     * @return $this
     */
    public function filterByBrowser(string $browser)
    {
        return $this->where([['browser', '=', $browser]]);
    }


    /**
     * Filter by platform
     * @param string $platform
     * 
     * @return $this
     */
    public function filterByPlatform(string $platform)
    {
        return $this->where([['platform', '=', $platform]]);
    }


    /**
     * Filter by user agent
     * @param string $userAgent
     * 
     * @return $this
     */
    public function filterByUserAgent(string $userAgent)
    {
        return $this->where([['user_agent', '=', $userAgent]]);
    }


    /**
     * Search by user agent
     * @param string $userAgent
     * 
     * @return $this
     */
    public function searchByUserAgent(string $userAgent)
    {
        return $this->where([['user_agent', 'LIKE', "%$userAgent%"]]);
    }

    /**
     * Search by keyword for string columns [ip_address, username, browser, platform, url, method, user_agent]
     * @param string $keyword
     * 
     * @return $this
     */
    public function searchByKeyword(string $keyword)
    {
        $search = "%$keyword%";

        $this->model = $this->model
            ->orWhere("ip_address", "LIKE", $search)
            ->orWhere("username", "LIKE", $search)
            ->orWhere("url", "LIKE", $search)
            ->orWhere("method", "LIKE", $search)
            ->orWhere("browser", "LIKE", $search)
            ->orWhere("platform", "LIKE", $search)
            ->orWhere("user_agent", "LIKE", $search);
        return $this;
    }
}