<?php

namespace App\Http\Controllers;

use App\Models\SolicitudPuerta;
use Illuminate\Http\Request;
use App\Helpers\Responses\HTTPResponse;
use Exception;

class SolicitudPuertaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function getAll()
    {
        try {
            $solicitudes = SolicitudPuerta::select('id', 'modelo', 'alto', 'ancho', 'precio', 'created_at')->where('status', '=', 1)->get();
            return HTTPResponse::Response200("Datos obtenidos correctamente", $solicitudes->toArray());
        } catch (\Exception $e) {
            return HTTPResponse::Response500("Error al obtener las solicitudes de puertas", $e);
        }
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'modelo' => 'required|string',
                'ancho' => 'required',
                'alto' => 'required',
                'um' => 'nullable|string',
                'precio' => 'required',
            ]);
            SolicitudPuerta::create($validated);
            return HTTPResponse::Response201("Solicitud creada exitosamente", $validated);
        } catch (\Exception $e) {
            return HTTPResponse::Response500("Error al obtener las solicitudes de puertas", $e);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($SolicitudPuertaId)
    {
        try {
            $SolicitudPuerta = SolicitudPuerta::find($SolicitudPuertaId);
            if ($SolicitudPuerta == null) {
                return HTTPResponse::Response404("No se encontró el registro con el ID especificado", []);
            }
            return HTTPResponse::Response200("Solicitud creada exitosamente", $SolicitudPuerta->toArray());
        } catch (\Exception $e) {
            return HTTPResponse::Response500("Error al obtener las solicitudes de puertas", $e);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SolicitudPuerta $solicitudPuerta)
    {
        try {
            $validated = $request->validate([
                'modelo' => 'required|string',
                'ancho' => 'required|integer',
                'alto' => 'required|integer',
                'um' => 'nullable|string',
                'precio' => 'required',
            ]);
            $solicitudPuerta->update($validated);
            return HTTPResponse::Response201("Registro actualizado exitosamente", $solicitudPuerta->toArray());
        } catch (\Exception $e) {
            return HTTPResponse::Response500("Error al obtener las solicitudes de puertas", $e);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SolicitudPuerta $solicitudPuerta)
    {
        try {
            $solicitudPuerta->update(['status' => 0]);
            return HTTPResponse::Response201("Registro eliminado exitosamente");
        } catch (\Exception $e) {
            return HTTPResponse::Response500("Error al obtener las solicitudes de puertas", $e);
        }
    }
}
