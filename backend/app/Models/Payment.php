<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = [
       'title',
       'amount',
       'due_date',
       'status',
       'category',
       'paid',
       'remaining',
       'razorpay_payment_id',
        'razorpay_order_id',
        'razorpay_signature'
];

}
