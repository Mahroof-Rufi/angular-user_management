import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {

  userData = {
    email: '',
    password: ''
  }

  errMessage: string = '';

  constructor(private service: UsersService) { }

  onLogin() {
    if (this.userData.email !== '' && this.userData.password !== '') {
      this.service.adminLogin(this.userData.email, this.userData.password)
    } else {
      this.errMessage = 'Enter valid email and password'
    }
  }
}
