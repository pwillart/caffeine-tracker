<?php

namespace App\Helpers;

class Helper
{

    /**
     * Generate an asset path for the application.
     *
     * @param  string  $path
     * @param  bool|null  $secure
     * @return string
     */
    public static function asset($path, $secure = null): string
    {
        return app('url')->asset($path, $secure);
    }

}
