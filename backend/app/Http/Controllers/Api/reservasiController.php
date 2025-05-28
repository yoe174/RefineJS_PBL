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
        $reservasi = reservasiModel::with('tempat')->get();
        return response()->json($reservasi);
    }

    // Tampilkan satu reservasi berdasarkan ID
    public function show($id)
    {
        $data = reservasiModel::with('tempat')->findOrFail($id);
        return response()->json($data);
    }

    // Simpan reservasi baru
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_pemesan' => 'required|string|max:255',
            'kontak_pemesan' => 'required|string|max:50',
            'tempat_reservasi_id' => 'required|exists:tempat_reservasi,tempat_reservasi_id',
            'nama_acara' => 'required|string|max:255',
            'tanggal_acara' => 'required|date',
            'waktu_mulai' => 'nullable',
            'waktu_selesai' => 'nullable',
            'jumlah_tamu' => 'nullable|numeric',
            'status_reservasi' => 'in:menunggu,dikonfirmasi,dijadwalkan,dilaksanakan,selesai,batal',
            'mengetahui' => 'nullable|string|max:255',
            'keterangan' => 'nullable|string',
        ]);

        $reservasi = reservasiModel::create($validated);
        return response()->json($reservasi, 201);
    }

    // Update reservasi
    public function update(Request $request, $id)
    {
        $reservasi = reservasiModel::findOrFail($id);

        $validated = $request->validate([
            'nama_pemesan' => 'sometimes|required|string|max:255',
            'kontak_pemesan' => 'sometimes|required|string|max:50',
            'tempat_reservasi_id' => 'sometimes|required|exists:tempat_reservasi,tempat_reservasi_id',
            'nama_acara' => 'sometimes|required|string|max:255',
            'tanggal_acara' => 'sometimes|required|date',
            'waktu_mulai' => 'nullable',
            'waktu_selesai' => 'nullable',
            'jumlah_tamu' => 'nullable|numeric',
            'status_reservasi' => 'in:menunggu,dikonfirmasi,dijadwalkan,dilaksanakan,selesai,batal',
            'mengetahui' => 'nullable|string|max:255',
            'keterangan' => 'nullable|string',
        ]);

        $reservasi->update($validated);
        return response()->json($reservasi);
    }

    // Hapus reservasi
    public function destroy($id)
    {
        $reservasi = reservasiModel::findOrFail($id);
        $reservasi->delete();

        return response()->json(['message' => 'Reservasi berhasil dihapus.']);
    }
}
