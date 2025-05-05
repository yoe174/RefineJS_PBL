<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\reservasiModel;
use Illuminate\Http\Request;

class reservasiController extends Controller
{
    public function index()
    {
        $reservasi = reservasiModel::all();
        return response()->json($reservasi);
    }
}
