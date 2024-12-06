<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FileUploadController;


Route::get('/upload', fn() => Inertia::render('Upload'));
Route::post('/upload', [FileUploadController::class, 'upload']);
Route::get('/history2', [FileUploadController::class, 'history']);
Route::get('/user/{id}', [FileUploadController::class, 'show']);
Route::get('/history', fn() => Inertia::render('History'));
Route::get('/file/{id}', fn($id) => Inertia::render('FileData', ['id' => $id]));
Route::get('/', function () {
    return Inertia::render('History');
});
Route::get('/file-status/{id}', [FileUploadController::class, 'getFileStatus']);
