<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class tayanganUlangModel extends Model
{
    use HasFactory;

    protected $table = "tayangan_ulang";
    protected $primaryKey = "tayangan_ulang_id";

    protected $fillable = [
        'tayangan_ulang_id',
        'link',
        'tanggal',
        'deskripsi',
    ];
}
