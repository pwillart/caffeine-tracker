<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateConsumedDrinksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::disableForeignKeyConstraints();

        Schema::create('consumed_drinks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->foreignId('drink_id')->constrained('drinks');
            $table->integer('servings')->unsigned()->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('consumed_drinks');
    }
}
