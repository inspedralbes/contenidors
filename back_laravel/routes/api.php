<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::get('/fruites', function () {
    //Per fer-ho bé hauriem de tenir un control·lador
    // i des de d'aquí simplement registrar la  ruta amb
    // Route::get('/fruites', [FruitController::class, 'index']);

    
    // Simplement retornem un array 
    $fruites = [
        'poma',
        'pera',
        'plàtan',
        'raïm'
    ];

    // Laravel ofereix el helper response()->json() per retornar JSON
    return response()->json($fruites);
});