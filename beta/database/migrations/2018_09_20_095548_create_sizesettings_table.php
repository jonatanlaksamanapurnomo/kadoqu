<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSizesettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sizesettings', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('sizetype_id')->unsigned();
            $table->integer('agegender_id')->unsigned();
            $table->string('name');
            $table->boolean('status')->default(0);
            $table->text('description');
            $table->string('created_by')->nullable();
            $table->string('updated_by')->nullable();
            $table->timestamps();

            $table->foreign('sizetype_id')->references('id')->on('sizetypes')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('agegender_id')->references('id')->on('agegenders')->onUpdate('cascade')->onDelete('cascade');
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sizesettings');
    }
}
