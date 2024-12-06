<?php

namespace App\Http\Controllers;

use App\Jobs\ProcessExcelFile;
use App\Models\FileUpload;
use Illuminate\Http\Request;


use App\Models\MetaData;

class FileUploadController extends Controller
{

    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,csv',
        ]);


        $file = $request->file('file');


        $filePath = $file->store('uploads');


        $fileUpload = FileUpload::create([
            'file_name' => $file->getClientOriginalName(),
            'upload_status' => 'Processing',
            'uploaded_at' => now(),
        ]);


        ProcessExcelFile::dispatch($filePath, $fileUpload->id);


        return back()->with([
            'message' => 'File uploaded successfully. Processing started.',
            'file_id' => $fileUpload->id,
        ]);
    }



    public function history()
    {
        $files = FileUpload::orderBy('uploaded_at', 'desc')->get();
        return response()->json(['files' => $files]);
    }



    public function show($file_id)
    {

        $metaData = MetaData::where('file_id', $file_id)->get();

        if ($metaData->isEmpty()) {
            return response()->json(['message' => 'No data found for this file'], 404);
        }


        return response()->json(['data' => $metaData]);
    }

    public function getFileStatus($id)
    {

        $fileUpload = FileUpload::find($id);


        if (!$fileUpload) {
            return response()->json(['message' => 'File not found'], 404);
        }
        return response()->json([
            'upload_status' => $fileUpload->upload_status,
        ]);
    }
}
