<?php

namespace App\Http\Middleware;

use App\Models\Activity;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Jenssegers\Agent\Agent;

class ActivityLog
{
  /**
   * Handle an incoming request.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
   * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
   */
  public function handle(Request $request, Closure $next)
  {
    try {
    //   $agent = new Agent();
    //   $ipAddress = $request->ip();
    //   $method = $request->method();
    //   $url = $request->fullUrl();
    //   $requestData = $request->all();
    //   $sessionData = session()->all();
    //   $userAgent = $request->userAgent();
    //   $browser = $agent->browser();
    //   $platform = $agent->platform($userAgent);
    //   $username = auth()->user()->username;
    //   Activity::create([
    //     "ip_address" => $ipAddress,
    //     "username" => $username,
    //     "url" => $url,
    //     "method" => $method,
    //     "browser" => $browser,
    //     "platform" => $platform,
    //     "user_agent" => $userAgent,
    //     "request_data" => $requestData,
    //     "session_data" => $sessionData
    //   ]);
      error_log("run here");
      return $next($request);
    } catch (\Throwable $th) {
      // Log::error("Middleware@ActivityRequestLog: cannot write log. - " . $th->getLine() . " - " . $th->getMessage());
      // dd("Something went wrong, you cannot continue access, please contact your Administator!");
    }
  }
}
