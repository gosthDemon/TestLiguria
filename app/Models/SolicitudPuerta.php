<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SolicitudPuerta extends Model
{
    use HasFactory;
    protected $fillable = [
        'modelo',
        'ancho',
        'alto',
        'um',
        'precio',
        'status',
        'created_at',
        'updated_at'
    ];
}
