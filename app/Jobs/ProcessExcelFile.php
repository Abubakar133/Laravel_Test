<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;
use App\Models\MetaData;
use App\Models\FileUpload;
use Box\Spout\Reader\Common\Creator\ReaderFactory;
use Exception;

class ProcessExcelFile implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $filePath;
    protected $fileId;

    public function __construct($filePath, $fileId)
    {
        $this->filePath = $filePath;
        $this->fileId = $fileId;
    }

    public function handle()
    {
        try {
            $absoluteFilePath = Storage::path($this->filePath);

            if (!file_exists($absoluteFilePath)) {
                throw new Exception('File does not exist at the specified path: ' . $absoluteFilePath);
            }

            $reader = ReaderFactory::createFromFile($absoluteFilePath);
            $reader->open($absoluteFilePath);

            $columns = null;
            $batch = [];

            foreach ($reader->getSheetIterator() as $sheet) {
                foreach ($sheet->getRowIterator() as $index => $row) {
                    $row = $row->toArray();

                    if ($index === 1) {

                        $columns = array_map([$this, 'sanitizeColumnName'], $row);
                        continue;
                    }

                    if (empty(array_filter($row))) {
                        continue;
                    }


                    $data = array_combine($columns, $row);

                    $batch[] = [
                        'file_id' => $this->fileId,
                        'data' => json_encode($data),
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];


                    if (count($batch) >= 100) {
                        MetaData::insert($batch);
                        $batch = [];
                    }
                }
            }


            if (!empty($batch)) {
                MetaData::insert($batch);
            }

            $reader->close();


            FileUpload::where('id', $this->fileId)->update([
                'upload_status' => 'Completed',
                'completed_at' => now(),
            ]);


            Storage::delete($this->filePath);
        } catch (Exception $e) {

            FileUpload::where('id', $this->fileId)->update([
                'upload_status' => 'Failed',
            ]);
        }
    }

    private function sanitizeColumnName($columnName)
    {
        return preg_replace('/[^a-zA-Z0-9_]/', '_', strtolower(trim($columnName)));
    }
}
