<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\jenisTransaksiModel;
use Illuminate\Http\Request;

class jenisTransaksiController extends Controller
{
    public function index()
    {
        $jenisTransaksi = jenisTransaksiModel::all();
        return response()->json($jenisTransaksi);
    }
}
