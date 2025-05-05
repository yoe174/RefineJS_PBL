<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\tempatReservasiModel;
use Illuminate\Http\Request;

class tempatReservasiController extends Controller
{
    public function index()
    {
        $tempatReservasi = tempatReservasiModel::all();
        return response()->json($tempatReservasi);
    }
}
