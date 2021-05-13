<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

// Any request to /api should have the header Accept application/json
$router->group(['prefix' => 'api','middleware' => 'json'], function () use ($router) {
    // Open routes
    $router->post('/register', 'AuthController@register');
    $router->post('/login', 'AuthController@login');
    $router->get('/drinks', 'DrinkController@index');

    // Protected routes
    $router->group(['middleware' => 'auth'], function () use ($router) {
        $router->get('/logout', 'AuthController@logout');
        $router->get('/user', 'UserController@index');
        $router->post('/user/consume', 'UserController@consume');
        $router->get('/user/drinks', 'UserController@consumedDrinks');
        $router->get('/user/reset', 'UserController@reset');
    });
});


// Redirect everything else to React
$router->get('/{route:.*}/', function ()  {
    return view('index');
});
