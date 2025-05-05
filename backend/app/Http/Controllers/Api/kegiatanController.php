<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\kegiatanModel;
use Illuminate\Http\Request;

class kegiatanController extends Controller
{
    public function index()
    {
        $kegiatan = kegiatanModel::all();
        return response()->json($kegiatan);
    }
}
