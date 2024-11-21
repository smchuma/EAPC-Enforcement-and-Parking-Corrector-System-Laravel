<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class ControlNumber extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'report_id',
        'control_number',
        'amount'
    ];

    public function report() {
        return $this->belongsTo(Report::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }
}
