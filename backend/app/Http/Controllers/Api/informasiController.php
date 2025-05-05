<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\informasiModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class informasiController extends Controller
{
    public function index()
    {
        $informasi = informasiModel::all();
        return response()->json($informasi);
    }

    public function store(Request $request)
    {
        $request->validate([
            'judul' => 'required|string|max:255',
            'isi' => 'required',
            'status' => 'required|in:aktif,arsip',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048'
        ]);

        $imagePath = null;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('informasi', 'public');
        }

        $informasi = informasiModel::create([
            'judul' => $request->judul,
            'isi' => $request->isi,
            'status' => $request->status,
            'image' => $imagePath,
        ]);

        return response()->json([
            'message' => 'Informasi berhasil disimpan.',
            'data' => $informasi
        ], 201);
    }

    public function show($id)
    {
        $informasi = informasiModel::findOrFail($id);
        return response()->json($informasi);
    }

    public function update(Request $request, $id)
    {
        $informasi = informasiModel::findOrFail($id);

        $request->validate([
            'judul' => 'sometimes|required|string|max:255',
            'isi' => 'sometimes|required',
            'status' => 'sometimes|required|in:aktif,arsip',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048'
        ]);

        $data = [];

        if ($request->has('judul')) {
            $data['judul'] = $request->judul;
        }

        if ($request->has('isi')) {
            $data['isi'] = $request->isi;
        }

        if ($request->has('status')) {
            $data['status'] = $request->status;
        }

        if ($request->hasFile('image')) {
            if ($informasi->image && Storage::disk('public')->exists($informasi->image)) {
                Storage::disk('public')->delete($informasi->image);
            }

            $data['image'] = $request->file('image')->store('informasi', 'public');
        }

        if (!empty($data)) {
            $informasi->update($data);
        }

        return response()->json([
            'message' => 'Informasi berhasil diperbarui.',
            'data' => $informasi
        ]);
    }

    public function destroy($id)
    {
        $informasi = informasiModel::findOrFail($id);

        if ($informasi->image && Storage::disk('public')->exists($informasi->image)) {
            Storage::disk('public')->delete($informasi->image);
        }

        $informasi->delete();

        return response()->json([
            'message' => 'Informasi berhasil dihapus.'
        ]);
    }
}
