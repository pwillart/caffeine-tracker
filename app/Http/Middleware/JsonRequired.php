<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Response;

class JsonRequired
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (!$request->wantsJson()) {
            return (new Response("Not authorized. Accept application/json header required.", 403));
        }

        return $next($request);
    }
}
