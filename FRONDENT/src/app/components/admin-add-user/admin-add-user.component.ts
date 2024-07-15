import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-admin-add-user',
  templateUrl: './admin-add-user.component.html',
  styleUrls: ['./admin-add-user.component.css']
})
export class AdminAddUserComponent {

  UserData = {
    image: '',
    fullName: '',
    about: '',
    email: '',
    password: '',
  }

  service: UsersService = inject(UsersService);
  router: Router = inject(Router);

  onSubmit() {
    if (this.UserData.fullName !== '' && this.UserData.email !== '' && this.UserData.about !== '' && this.UserData.password !== '') {
      this.service.addUser(this.UserData).subscribe((res: any) => {

      })
      this.router.navigateByUrl('/admin/list')
    }
  }
}
