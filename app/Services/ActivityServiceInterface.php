<?php
namespace App\Services;

use App\Services\BaseServiceInterface;

interface ActivityServiceInterface extends BaseServiceInterface
{
    public function get(string $ipAddress, string $username, string $url, string $method, string $browser, string $platform, string $userAgent, int $recordPerPage, array $columns, array $orderBy);

    public function search(string $keyword, string $username = null, int $recordPerPage = 15, array $columns = [], array $orderBy = []);
}