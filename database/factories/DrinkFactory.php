<?php

namespace Database\Factories;

use App\Models\Drink;
use Illuminate\Database\Eloquent\Factories\Factory;

class DrinkFactory extends Factory
{
    protected $model = Drink::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'caffeine_per_serving' => $this->faker->numberBetween(60, 500),
            'servings' => $this->faker->numberBetween(1,4)
        ];
    }
}
