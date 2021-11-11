<?php
use App\Selling;
use Illuminate\Database\Seeder;

class SellingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create(); 
        $batas = 1000;

        for ($i=0;$i<=$batas;$i++){
        	Selling::create([ 
        		'amount' => $faker->randomNumber(5),
        		'date' => $faker->dateTimeThisYear($max = 'now', $timezone = null)
        	]);
        }
    }
}
