<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNewsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('news', function (Blueprint $table) {
            $table->increments('id');
            $table->string('judul');
            $table->string('judul_slug');
            $table->string('spoiler');
            $table->integer('categories_id')->unsigned();
            $table->text('deskripsi');
            $table->string('cover')->nullable();
            $table->integer('views')->default(0);
            $table->boolean('status')->default(0);
            $table->timestamps();

            $table->foreign('categories_id')->references('id')->on('categories')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('news');
    }
}
