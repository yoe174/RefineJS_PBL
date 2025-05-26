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
Route::put('/informasi/{id}', [informasiController::class, 'update']); // disesuaikan dengan refine
Route::patch('/informasi/{id}', [informasiController::class, 'update']);
Route::delete('/informasi/{id}', [informasiController::class, 'destroy']);

use App\Http\Controllers\Api\kegiatanController;

Route::get('/kegiatan', [kegiatanController::class, 'index']);
Route::post('/kegiatan', [kegiatanController::class, 'store']);
Route::get('/kegiatan/{id}', [kegiatanController::class, 'show']);
Route::post('/kegiatan/{id}', [kegiatanController::class, 'update']); // PATCH via _method
Route::put('/kegiatan/{id}', [kegiatanController::class, 'update']);
Route::patch('/kegiatan/{id}', [kegiatanController::class, 'update']);
Route::delete('/kegiatan/{id}', [kegiatanController::class, 'destroy']);

use App\Http\Controllers\Api\transaksiController;

Route::get('/transaksi', [transaksiController::class, 'index']);
Route::post('/transaksi', [transaksiController::class, 'store']);
Route::get('/transaksi/summary', [transaksiController::class, 'summary']);
Route::get('/transaksi/{id}', [transaksiController::class, 'show']);
Route::post('/transaksi/{id}', [transaksiController::class, 'update']); // PATCH via _method
Route::put('/transaksi/{id}', [transaksiController::class, 'update']);
Route::patch('/transaksi/{id}', [transaksiController::class, 'update']);
Route::delete('/transaksi/{id}', [transaksiController::class, 'destroy']);

use App\Http\Controllers\Api\jenisTransaksiController;

Route::get('/jenis_transaksi', [jenisTransaksiController::class, 'index']);
Route::post('/jenisTransaksi', [jenisTransaksiController::class, 'store']);
Route::get('/jenis_transaksi/{id}', [jenisTransaksiController::class, 'show']);
Route::post('/jenisTransaksi/{id}', [jenisTransaksiController::class, 'update']); // PATCH via _method
Route::put('/jenisTransaksi/{id}', [jenisTransaksiController::class, 'update']);
Route::patch('/jenisTransaksi/{id}', [jenisTransaksiController::class, 'update']);
Route::delete('/jenisTransaksi/{id}', [jenisTransaksiController::class, 'destroy']);

use App\Http\Controllers\Api\tempatReservasiController;

Route::get('/tempat_reservasi', [tempatReservasiController::class, 'index']);
Route::post('/tempat_reservasi', [tempatReservasiController::class, 'store']);
Route::get('/tempat_reservasi/{id}', [tempatReservasiController::class, 'show']);
Route::post('/tempat_reservasi/{id}', [tempatReservasiController::class, 'update']); // PATCH via _method
Route::put('/tempat_reservasi/{id}', [tempatReservasiController::class, 'update']);
Route::patch('/tempat_reservasi/{id}', [tempatReservasiController::class, 'update']);
Route::delete('/tempat_reservasi/{id}', [tempatReservasiController::class, 'destroy']);