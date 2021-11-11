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
            $table->integer('no');
            $table->string('namaProduk');
            $table->string('SKU',30);
            $table->primary('SKU');
            $table->string('prettyURL');
            $table->integer('idKategoriStore')->unsigned();
            $table->integer('idSubKategoriStore')->unsigned();
            $table->integer('idKategoriStore2')->unsigned();
            $table->integer('idSubKategoriStore2')->unsigned();
            $table->integer('idKategoriGift')->unsigned();
            $table->integer('idKategoriGift2')->unsigned();
            //Ukuran = Size
            $table->integer('idUkuran')->unsigned();
            $table->integer('idColor')->unsigned();
            $table->integer('idBrand')->unsigned();
            $table->integer('weight');
            $table->decimal('hargaDasar');
            $table->decimal('hargaJual');
            $table->decimal('hargaDiscount');
            $table->string('tags');
            $table->string('description');
            $table->string('metaTitle');
            $table->string('metaDescription');
            $table->string('metaKeyword');
            $table->integer('stock');
            $table->string('gambar');
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
        Schema::dropIfExists('products');
    }
}
