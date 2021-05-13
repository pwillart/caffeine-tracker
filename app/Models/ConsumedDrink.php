<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ConsumedDrink extends Model
{
    /***
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /***
     * @return BelongsTo
     */
    public function drink(): BelongsTo
    {
        return $this->belongsTo(Drink::class);
    }
}
