<?php

namespace App\Http\Controllers;

use App\Helpers\Responses\HTTPResponse;
use Illuminate\Http\Request;

class TestController extends Controller
{
    public function prueba(Request $request)
    {
        try {
            $request->validate([
                'nombre' => 'required|string',
                'edad' => 'required|integer',
            ]);
            $a = [];
            return $a["data"];
        } catch (\Exception $e) {
            return HTTPResponse::Response401("Algunos datos no tienen el formato esperado", $e);
        }
    }
    public function index()
    {
        try {
            return view('index');
        } catch (\Exception $e) {
            return HTTPResponse::Response400("Algunos datos no tienen el formato esperado", ["nombre" => "hola"], false);
        }
    }
}
