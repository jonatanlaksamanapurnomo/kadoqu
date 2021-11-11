<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('brand_id')->unsigned();
            $table->integer('categories_id')->unsigned();
            $table->integer('agegender_id')->unsigned();
            $table->integer('sizesetting_id')->unsigned();
            $table->integer('colorsetting_id')->unsigned();
            $table->string('name');
            $table->string('code');
            $table->string('pretty_url');
            $table->integer('publish');
            $table->string('tags');
            $table->string('tagline');
            $table->string('description');
            $table->string('meta_title');
            $table->string('meta_keywords');
            $table->string('meta_description');
            $table->double('weight');
            $table->double('basic_price');
            $table->double('discount');
            $table->string('packing');
            $table->double('publish_price');
            $table->double('discount_price');
            $table->string('images')->nullable();
            $table->string('created_by')->nullable();
            $table->string('updated_by')->nullable();
            $table->timestamps();

            $table->foreign('categories_id')->references('id')->on('categories')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('agegender_id')->references('id')->on('agegenders')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('brand_id')->references('id')->on('brands')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('sizesetting_id')->references('id')->on('sizesettings')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('colorsetting_id')->references('id')->on('colorsettings')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
