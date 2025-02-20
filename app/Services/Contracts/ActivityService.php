<?php
namespace App\Services\Contracts;

use App\Repositories\ActivityRepositoryInterface;
use App\Services\ActivityServiceInterface;
use Exception;
use Illuminate\Support\Facades\Log;
use Throwable;

class ActivityService extends BaseService implements ActivityServiceInterface
{
    protected $repository;

    public function __construct(ActivityRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }
    /**
     * Get activities with filter
     * 
     * @param string $ipAddress
     * @param string $username
     * @param string $url
     * @param string $method
     * @param string $browser
     * @param string $platform
     * @param string $userAgent
     * @param int $recordPerPage
     * @param array[string] $columns
     * 
     * @return mixed
     */
    public function get(string $ipAddress = null, string $username = null, string $url = null, string $method = null, string $browser = null, string $platform = null, string $userAgent = null, int $recordPerPage = 15, array $columns = ["*"], array $orderBy = ['created_at', 'desc'])
    {
        try {

            if ($ipAddress) {
                $this->repository->filterByIpAddress($ipAddress);
            }
            if ($username) {
                $this->repository->filterByUsername($username);
            }
            if ($url) {
                $this->repository->filterByUrl($url);
            }
            if ($method) {
                $this->repository->filterByMethod($method);
            }
            if ($browser) {
                $this->repository->filterByBrowser($browser);
            }
            if ($platform) {
                $this->repository->filterByPlatform($platform);
            }
            if ($userAgent) {
                $this->repository->filterByUserAgent($userAgent);
            }
            if ($orderBy) {
                $this->repository->orderBy(...$orderBy);
            }
            if ($recordPerPage == -1) {
                return $this->repository->get($columns);
            }
            return $this->repository->paginate($recordPerPage, $columns);
        } catch (Throwable $th) {
            Log::error("ActivityService@get: " . $th->getLine() . ' - ' . $th->getMessage());
            return new Exception($th->getMessage(), $th->getCode());
        }
    }

    /**
     * Search activities by keyword
     * @param string $keyword
     * @param int $recordPerPage
     * @param array[string] $columns
     * 
     * @return mixed
     */
    public function search(string $keyword = null, string $username = null, int $recordPerPage = 15, array $columns = ["*"], array $orderBy = ['created_at', 'desc'])
    {
        try {
            if ($username) {
                $this->repository->filterByUsername($username);
            }
            if ($keyword) {
                $this->repository->searchByKeyword($keyword);
            }
            $this->repository->orderBy(...$orderBy);
            if ($recordPerPage == -1) {
                return $this->repository->get($columns);
            }
            return $this->repository->paginate($recordPerPage, $columns);
        } catch (Throwable $th) {
            Log::error("ActivityService@search: " . $th->getLine() . ' - ' . $th->getMessage());
            return new Exception($th->getMessage(), $th->getCode());
        }
    }
}