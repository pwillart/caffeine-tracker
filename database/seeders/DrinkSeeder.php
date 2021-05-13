<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DrinkSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('drinks')->insert([
            'name' => 'Monster Ultra Sunrise',
            'description' => 'A refreshing orange beverage',
            'caffeine_per_serving' => 75,
            'servings' => 2
        ]);

        DB::table('drinks')->insert([
            'name' => 'Black Coffee',
            'description' => 'The classic in an 8 oz. serving',
            'caffeine_per_serving' => 95
        ]);

        DB::table('drinks')->insert([
            'name' => 'Americano',
            'description' => 'Espresso based drink combined with four ounces of hot water',
            'caffeine_per_serving' => 77
        ]);

        DB::table('drinks')->insert([
            'name' => 'Sugar free NOS',
            'description' => 'Orange delight without sugar',
            'caffeine_per_serving' => 130,
            'servings' => 2
        ]);

        DB::table('drinks')->insert([
            'name' => '5 Hour Energy',
            'description' => '2 oz. shot of get up and go!',
            'caffeine_per_serving' => 200
        ]);

    }
}
