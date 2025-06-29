<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TodoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;




// Though we're not currently using `/api/user` on the frontend...
// who knows what the future holds? Maybe one day it’ll rise like a Phoenix
// (Or remain forever forgotten in the API abyss.)
  Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


// Authentication
Route::post('/register', [AuthController::class, 'register'])
    ->name('api.register');

Route::post('/login',    [AuthController::class, 'login'])
    ->name('api.login');

Route::post('/logout',   [AuthController::class, 'logout'])
    ->middleware('auth:sanctum')
    ->name('api.logout');


// Todo CRUD (protected)
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('todos', TodoController::class)
        ->only(['index', 'store', 'update', 'destroy']);
});
