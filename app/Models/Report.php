<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'daily_sales',
        'sales_proof_image'

    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function control_number() {
        return $this->hasMany(ControlNumber::class);
    }
}
