<?php
use Illuminate\Database\Seeder;
use App\Role;
use App\User;
use Laratrust\Traits\LaratrustUserTrait;
use App\Permission;
class UsersSeeder extends Seeder
{
	public function run()
	{
// Membuat role Super Admin
		$suadminRole = new Role();
		$suadminRole->name = "suadmin";
		$suadminRole->display_name = "Suadmin";
		$suadminRole->save();
// Membuat role admin
		$adminRole = new Role();
		$adminRole->name = "admin";
		$adminRole->display_name = "Admin";
		$adminRole->save();
// Membuat role member
		$memberRole = new Role();
		$memberRole->name = "member";
		$memberRole->display_name = "Member";
		$memberRole->save();



// Membuat sample super admin
		$suadmin = new User();
		$suadmin->is_verified = 1;
		$suadmin->name = 'Super Admin';
		$suadmin->email = 'super@gmail.com';
		$suadmin->password = bcrypt('rahasia');
		$suadmin->images = 'icons8-male-user-50.png';
		$suadmin->save();
		$suadmin->attachRole($suadminRole);
// Membuat sample admin
		$admins = new User();
		$admins->is_verified = 1;
		$admins->name = 'Admin';
		$admins->email = 'admin@gmail.com';
		$admins->password = bcrypt('rahasia');
		$admins->images = 'icons8-male-user-50.png';
		$admins->save();
		$admins->attachRole($adminRole);

		$admins = new User();
		$admins->is_verified = 1;
		$admins->name = 'iChwan';
		$admins->email = 'ichwanarif26@gmail.com';
		$admins->password = bcrypt('rahasia');
		$admins->images = 'icons8-male-user-50.png';
		$admins->save();
		$admins->attachRole($adminRole);
// Membuat sample member
		$member = new User();
		$member->is_verified = 1;
		$member->name = "Sample Member";
		$member->email = 'member@gmail.com';
		$member->password = bcrypt('rahasia');
		$member->images = 'null';
		$member->save();
		$member->attachRole($memberRole);



		//Crud Permision
		$createCategories = new Permission();
		$createCategories->name         = 'crud-categories';
		$createCategories->display_name = 'CRUD Categories';
		// Allow a user to...
		$createCategories->description  = 'CRUD Categories';
		$createCategories->save();

		$crudSelling = new Permission();
		$crudSelling->name         = 'crud-selling';
		$crudSelling->display_name = 'CRUD Selling';
		// Allow a user to...
		$crudSelling->description  = 'CRUD Selling';
		$crudSelling->save();

		$crudUser = new Permission();
		$crudUser->name         = 'crud-users';
		$crudUser->display_name = 'CRUD Users';
		// Allow a user to...
		$crudUser->description  = 'CRUD Users';
		$crudUser->save();

		$configurationMenu = new Permission();
		$configurationMenu->name         = 'configuration-menu';
		$configurationMenu->display_name = 'Configuration Menu';
		// Allow a user to...
		$configurationMenu->description  = 'Configuration Menu';
		$configurationMenu->save();

		$logAct = new Permission();
		$logAct->name         = 'loguser-act';
		$logAct->display_name = 'Log Users';
		// Allow a user to...
		$logAct->description  = 'Log Users';
		$logAct->save();
 

		// $adminRole->syncPermissions([$createCategories->id, $crudSelling->id]);
		
		$adminRole->attachPermissions([$createCategories,$crudSelling]); 
		$suadminRole->attachPermissions([$crudUser,$logAct,$configurationMenu,$createCategories,$crudSelling]);
 
	}
}