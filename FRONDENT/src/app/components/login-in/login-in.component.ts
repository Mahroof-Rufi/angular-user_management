import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { userState } from 'src/app/services/store/user.model';
import { initialAdd } from 'src/app/services/store/users.actions';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login-in',
  templateUrl: './login-in.component.html',
  styleUrls: ['./login-in.component.css']
})
export class LoginINComponent implements OnInit {

  userData = {
    email: "",
    password: "",
  }

  errMessage: string = '';

  constructor(private http: HttpClient, private router: Router, private store: Store<{ user: userState }>) { }

  service: UsersService = inject(UsersService)

  ngOnInit(): void {

  }

  onLogin() {
    if (this.userData.email !== '' && this.userData.password !== '') {
      this.service.userLogin(this.userData).subscribe((res: any) => {
        if (res.status == true) {
          localStorage.setItem('loginToken', res.token);
          localStorage.setItem('stateData', JSON.stringify(res.userData));
          this.store.dispatch(initialAdd({ data: res.userData }))
          this.router.navigateByUrl('/home');
        } else {
          this.errMessage = 'user not exist'
        }
      })
    } else {
      this.errMessage = 'Enter valid email and password'
    }
  }
}
