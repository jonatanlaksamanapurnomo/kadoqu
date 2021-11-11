<?php
use App\Cms;
use Illuminate\Database\Seeder;

class CmsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Cms::create([
        	'judul' 	=> "Write Name of Company",
        	'tagline' 	=> "Write Tagline Your Company",
        	'slogan'	=> "Write Motto of Your Company",
        	'about'		=> "Wtire About Your Company",
        	'facebook' 	=> "Write Your URL Facebook Account",
        	'twitter'	=> "Write Your URL Twitter Account",
        	'instagram' => "Write Your URL Instagram Account",
        	'phone' 	=> "0",
            'cover'     => "Write-Name-of-Company.png",
        	'email' 	=> "example@mail.com",
        	'address' 	=> "Write Your Address Company",
        	'status' 	=> "0",
        	]);
    }
}
