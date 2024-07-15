import { Component, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { userState } from '../services/store/user.model';
import { initialState } from '../services/store/user.state';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { initialAdd } from '../services/store/users.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  UserData = {
    id: '',
    fullName: '',
    email: '',
    image: '',
    about: '',
  }

  constructor(private store: Store<{ user: userState }>) { }

  service: UsersService = inject(UsersService);
  router: Router = inject(Router)

  ngOnInit(): void {
    this.store.pipe(select('user')).subscribe(userState => {
      this.UserData = {
        id: userState?.id || initialState.id,
        fullName: userState?.fullName || initialState.fullName,
        email: userState?.email || initialState.email,
        image: userState?.image || initialState.image,
        about: userState?.about || initialState.about
      };
    });

    this.service.updateState()
  }


  logout() {
    localStorage.removeItem('loginToken')
    localStorage.removeItem('stateData')
    this.router.navigateByUrl('/login')
  }

}
