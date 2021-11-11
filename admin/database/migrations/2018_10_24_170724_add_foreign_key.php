<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddForeignKey extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('products', function($table) {
            $table->foreign('idKategoriStore')->references('idKategoriStore')->on('category_stores')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('idSubKategoriStore')->references('idSubKategoriStore')->on('sub_category_stores')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('idKategoriStore2')->references('idKategoriStore')->on('category_stores')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('idSubKategoriStore2')->references('idSubKategoriStore')->on('sub_category_stores')->onUpdate('cascade')->onDelete('cascade');   
            $table->foreign('idUkuran')->references('idUkuran')->on('sizes')->onUpdate('cascade')->onDelete('cascade');   
            $table->foreign('idColor')->references('idColor')->on('colors')->onUpdate('cascade')->onDelete('cascade');   
            $table->foreign('idBrand')->references('idBrand')->on('brands')->onUpdate('cascade')->onDelete('cascade');   
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('products', function($table) {
            $table->dropForeign(['idKategoriStore']);
            $table->dropForeign(['idKategoriStore2']);
            $table->dropForeign(['idSubKategoriStore']);
            $table->dropForeign(['idSubKategoriStore2']);
            $table->dropForeign(['idUkuran']);
            $table->dropForeign(['idColor']);
            $table->dropForeign(['idBrand']);
        });
    }
}
