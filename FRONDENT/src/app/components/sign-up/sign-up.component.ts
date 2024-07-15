import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  RegisterationData: any = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    about: '',
  }

  errMessage: string = ''

  constructor(private http: HttpClient, private router: Router, private service: UsersService) { }

  onRegister() {

    if (this.RegisterationData.email !== '' && this.RegisterationData.name !== '') {
      if (this.RegisterationData.password === this.RegisterationData.confirmPassword) {
        this.service.registerUser(this.RegisterationData).subscribe((res: any) => {
          if (res.status == true) {
            this.router.navigateByUrl('/login');
          } else {
            this.errMessage = res.error
          }
        })
      } else {
        this.errMessage = 'Password and comfirm should be same'
      }
    } else {
      this.errMessage = 'Enter a valid email and name'
    }
  }

}
