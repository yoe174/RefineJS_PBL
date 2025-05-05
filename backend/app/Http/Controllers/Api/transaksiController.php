<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\transaksiModel;
use Illuminate\Http\Request;

class transaksiController extends Controller
{
    public function index()
    {
        $transaksi = transaksiModel::all();
        return response()->json($transaksi);
    }
}
