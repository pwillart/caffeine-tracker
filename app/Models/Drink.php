<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Drink extends Model
{
    use HasFactory;

    /***
     * @return HasMany
     */
    public function consumedDrinks(): HasMany
    {
        return $this->hasMany(ConsumedDrink::class);
    }

}
