<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/test', function () {
    return response()->json(['message' => 'CORS Test Successful dari laravel']);
});

/////////// user controller
use App\Http\Controllers\Api\userController;

Route::get('/user', [userController::class, 'index']);
Route::post('/user', [userController::class, 'store']);
Route::get('/user/{id}', [userController::class, 'show']);
Route::put('/user/{id}', [userController::class, 'update']);
Route::patch('/user/{id}', [userController::class, 'update']);
Route::delete('/user/{id}', [userController::class, 'destroy']);

////////// Role Controller
use App\Http\Controllers\Api\roleController;

Route::get('/role', [roleController::class, 'index']);
Route::post('/role', [roleController::class, 'store']);
Route::get('/role/{id}', [roleController::class, 'show']);
Route::put('/role/{id}', [roleController::class, 'update']);
Route::patch('/role/{id}', [roleController::class, 'update']);
Route::delete('/role/{id}', [roleController::class, 'destroy']);

use App\Http\Controllers\Api\informasiController;
Route::get('/informasi', [informasiController::class, 'index']);
Route::post('/informasi', [informasiController::class, 'store']); // untuk upload
Route::get('/informasi/{id}', [informasiController::class, 'show']);
Route::patch('/informasi/{id}', [informasiController::class, 'update']); // disesuaikan dengan refine
Route::delete('/informasi/{id}', [informasiController::class, 'destroy']);