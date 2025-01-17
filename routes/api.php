<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SolicitudPuertaController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/bienvenida', function () {
    return response()->json(['mensaje' => '¡Bienvenido a la API!']);
});

Route::prefix('solicitud-puertas')->group(function () {
    Route::get('/', [SolicitudPuertaController::class, 'getAll']);
    Route::post('/', [SolicitudPuertaController::class, 'store']);
    Route::get('/edit/{SolicitudPuertaId}', [SolicitudPuertaController::class, 'edit']);
    Route::put('/{solicitudPuerta}', [SolicitudPuertaController::class, 'update']);
    Route::delete('/{solicitudPuerta}', [SolicitudPuertaController::class, 'destroy']);
});
