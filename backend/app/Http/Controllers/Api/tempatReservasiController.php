<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\tempatReservasiModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class tempatReservasiController extends Controller
{
    public function index()
    {
        $tempat = tempatReservasiModel::all();
        return response()->json($tempat);
    }

    public function store(Request $request)
    {
        $request->validate([
            'lokasi' => 'required|string',
            'kapasitas' => 'nullable|numeric',
            'keterangan' => 'nullable',
            'biaya' => 'nullable|numeric',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $imagePath = null;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('tempat_reservasi', 'public');
        }

        $tempat = tempatReservasiModel::create([
            'lokasi' => $request->lokasi,
            'kapasitas' => $request->kapasitas,
            'keterangan' => $request->keterangan,
            'biaya' => $request->biaya,
            'image' => $imagePath,
        ]);

        return response()->json([
            'message' => 'Tempat reservasi berhasil ditambahkan.',
            'data' => $tempat
        ], 201);
    }

    public function show($id)
    {
        $tempat = tempatReservasiModel::findOrFail($id);
        return response()->json($tempat);
    }

    public function update(Request $request, $id)
    {
        $tempat = tempatReservasiModel::findOrFail($id);

        $request->validate([
            'lokasi' => 'required|string',
            'kapasitas' => 'nullable|numeric',
            'keterangan' => 'nullable',
            'biaya' => 'nullable|numeric',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $data = [
            'lokasi' => $request->lokasi,
            'kapasitas' => $request->kapasitas,
            'keterangan' => $request->keterangan,
            'biaya' => $request->biaya
        ];

        if ($request->has('remove_image') && !$request->hasFile('image')) {
            if ($tempat->image && Storage::disk('public')->exists($tempat->image)) {
                Storage::disk('public')->delete($tempat->image);
            }
            $data['image'] = null;
        }

        if ($request->hasFile('image')) {
            if ($tempat->image && Storage::disk('public')->exists($tempat->image)) {
                Storage::disk('public')->delete($tempat->image);
            }
            $data['image'] = $request->file('image')->store('tempat_reservasi', 'public');
        }

        $tempat->update($data);

        return response()->json([
            'message' => 'Tempat reservasi berhasil diperbarui.',
            'data' => $tempat
        ]);
    }

    public function destroy($id)
    {
        $tempat = tempatReservasiModel::findOrFail($id);

        if ($tempat->image && Storage::disk('public')->exists($tempat->image)) {
            Storage::disk('public')->delete($tempat->image);
        }

        $tempat->delete();

        return response()->json([
            'message' => 'Tempat reservasi berhasil dihapus.'
        ]);
    }
}
