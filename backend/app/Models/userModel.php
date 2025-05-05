<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class userModel extends Model
{
    use HasFactory;
    protected $table = "users";
    protected $primaryKey = "user_id";

    protected $fillable =
    [
        'user_id',
        'role_id',
        'name',
        'email',
        'password',
    ];

    public function role()
    {
        return $this->belongsTo(roleModel::class, 'role_id', 'role_id');
    }

    public function index()
    {
        $users = userModel::all();
        return response()->json($users); // Pastikan ini mengembalikan JSON
        
    }
}
