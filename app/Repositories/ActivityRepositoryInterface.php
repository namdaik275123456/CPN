<?php
namespace App\Repositories;

use App\Repositories\BaseRepositoryInterface;

interface ActivityRepositoryInterface extends BaseRepositoryInterface
{
    /**
     * Filter by ip address
     * @param string $ipAddress
     * 
     * @return $this
     */
    public function filterByIpAddress(string $ipAddress);

    /**
     * Filter by username
     * @param string $username
     * 
     * @return $this
     */
    public function filterByUsername(string $username);

    /**
     * Filter by url
     * @param string $url
     * 
     * @return $this
     */
    public function filterByUrl(string $url);

    /**
     * Filter by method
     * @param string $method
     * 
     * @return $this
     */
    public function filterByMethod(string $method);


    /**
     * Filter by browser
     * @param string $browser
     * 
     * @return $this
     */
    public function filterByBrowser(string $browser);


    /**
     * Filter by platform
     * @param string $platform
     * 
     * @return $this
     */
    public function filterByPlatform(string $platform);


    /**
     * Filter by user agent
     * @param string $userAgent
     * 
     * @return $this
     */
    public function filterByUserAgent(string $userAgent);


    /**
     * Search by user agent
     * @param string $userAgent
     * 
     * @return $this
     */
    public function searchByUserAgent(string $userAgent);


    /**
     * Search by keyword for string columns [ip_address, username, browser, platform, url, method, user_agent]
     * @param string $keyword
     * 
     * @return $this
     */
    public function searchByKeyword(string $keyword);
}