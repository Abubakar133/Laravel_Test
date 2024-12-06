<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MetaData extends Model
{
    use HasFactory;

   
    protected $table = 'meta_data';  

  
    protected $fillable = ['file_id', 'data', 'created_at', 'updated_at'];

   
    protected $casts = [
        'data' => 'array',
    ];

    
    public $timestamps = true;

    
}
