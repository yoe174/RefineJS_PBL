<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\kegiatanModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Carbon;

class kegiatanController extends Controller
{
    public function index()
    {
        $kegiatan = kegiatanModel::all();
        return response()->json($kegiatan);
    }

    public function store(Request $request)
{
    $request->validate([
        'nama_kegiatan' => 'required|string|max:255',
        'isi' => 'required',
        'tanggal' => 'required|date|after_or_equal:today',
        'waktu_mulai' => 'nullable|date_format:H:i',
        'waktu_selesai' => 'nullable|date_format:H:i|after:waktu_mulai',
        'lokasi' => 'required|string|max:255',
        'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
    ]);

    $data = $request->only(['nama_kegiatan', 'isi', 'tanggal', 'waktu_mulai', 'waktu_selesai', 'lokasi']);

    if ($request->hasFile('image')) {
        $data['image'] = $request->file('image')->store('kegiatan', 'public');
    }

    // Auto status
    $now = Carbon::now();
    $tanggal = Carbon::parse($request->tanggal);
    $waktuMulai = $request->waktu_mulai ? Carbon::parse($request->tanggal . ' ' . $request->waktu_mulai) : null;
    $waktuSelesai = $request->waktu_selesai ? Carbon::parse($request->tanggal . ' ' . $request->waktu_selesai) : null;

    if ($waktuMulai && $now->lt($waktuMulai)) {
        $data['status'] = 'dijadwalkan';
    } elseif ($waktuSelesai && $now->lt($waktuSelesai)) {
        $data['status'] = 'dilaksanakan';
    } else {
        $data['status'] = 'selesai';
    }

    $kegiatan = kegiatanModel::create($data);
    return response()->json(['message' => 'Kegiatan berhasil dibuat', 'data' => $kegiatan]);
}

public function show($id)
{
    $kegiatan = kegiatanModel::findOrFail($id);
    return response()->json($kegiatan);
}

public function update(Request $request, $id)
{
    $kegiatan = kegiatanModel::findOrFail($id);

    $request->validate([
        'nama_kegiatan' => 'required|string|max:255',
        'isi' => 'required',
        'tanggal' => 'required|date|after_or_equal:today',
        'waktu_mulai' => 'nullable|date_format:H:i',
        'waktu_selesai' => 'nullable|date_format:H:i|after:waktu_mulai',
        'lokasi' => 'required|string|max:255',
        'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
    ]);

    $data = $request->only(['nama_kegiatan', 'isi', 'tanggal', 'waktu_mulai', 'waktu_selesai', 'lokasi']);

    if ($request->hasFile('image')) {
        if ($kegiatan->image && Storage::disk('public')->exists($kegiatan->image)) {
            Storage::disk('public')->delete($kegiatan->image);
        }
        $data['image'] = $request->file('image')->store('kegiatan', 'public');
    }

    // Auto update status
    $now = Carbon::now();
    $tanggal = Carbon::parse($request->tanggal);
    $waktuMulai = $request->waktu_mulai ? Carbon::parse($request->tanggal . ' ' . $request->waktu_mulai) : null;
    $waktuSelesai = $request->waktu_selesai ? Carbon::parse($request->tanggal . ' ' . $request->waktu_selesai) : null;

    if ($waktuMulai && $now->lt($waktuMulai)) {
        $data['status'] = 'dijadwalkan';
    } elseif ($waktuSelesai && $now->lt($waktuSelesai)) {
        $data['status'] = 'dilaksanakan';
    } else {
        $data['status'] = 'selesai';
    }

    $kegiatan->update($data);
    return response()->json(['message' => 'Kegiatan berhasil diperbarui', 'data' => $kegiatan]);
}

public function destroy($id)
{
    $kegiatan = kegiatanModel::findOrFail($id);

    if ($kegiatan->image && Storage::disk('public')->exists($kegiatan->image)) {
        Storage::disk('public')->delete($kegiatan->image);
    }

    $kegiatan->delete();
    return response()->json(['message' => 'Kegiatan berhasil dihapus']);
}
}
