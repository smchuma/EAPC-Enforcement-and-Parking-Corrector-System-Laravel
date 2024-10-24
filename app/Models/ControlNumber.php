<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ControlNumber extends Model
{
    use HasFactory;

    protected $fillable = [
        'report_id',
        'control_number',
        'amount'
    ];

    public function report() {
        return $this->belongsTo(Report::class);
    }
}
