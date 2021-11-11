<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAgegendersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('agegenders', function (Blueprint $table) {
            $table->increments('id');
            $table->boolean('type')->default(0);
            $table->boolean('status')->default(0);
            $table->string('name');
            $table->string('created_by')->nullable();
            $table->string('updated_by')->nullable();
            $table->text('description');
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
        Schema::dropIfExists('agegenders');
    }
}
