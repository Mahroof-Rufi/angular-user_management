import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { userState } from 'src/app/services/store/user.model';
import { initialState } from 'src/app/services/store/user.state';
import { updateUser } from 'src/app/services/store/users.actions';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  UserData: any = {
    id: '',
    fullName: '',
    email: '',
    image: 'https://bootdey.com/img/Content/avatar/avatar7.png',
    about: '',
  }
  imageFile: any;

  constructor(private store: Store<{ user: userState }>, private userService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.store.pipe(select('user')).subscribe(userState => {
      this.UserData = {
        id: userState?.id || initialState.id,
        fullName: userState?.fullName || initialState.fullName,
        email: userState?.email || initialState.email,
        image: userState?.image || initialState.image,
        about: userState?.about || initialState.about,
      };
    });

    this.userService.updateState()

    console.log('here the userafat');
    console.log(this.UserData);


  }

  onEdit() {
    console.log('on edit fn');

    const formData = new FormData()
    formData.append('id', this.UserData.id)
    formData.append('fullName', this.UserData.fullName)
    formData.append('email', this.UserData.email)
    formData.append('image', this.UserData.image)
    formData.append('about', this.UserData.about)
    formData.append('file', this.imageFile)

    this.userService.updateUser(formData).subscribe((res: any) => {
      if (res.status == true) {
        console.log('here the updated data');
        console.log(res.userData);


        this.store.dispatch(updateUser({ newData: res.userData }));
        localStorage.setItem('stateData', JSON.stringify(res.userData))
        this.router.navigateByUrl('/home')
      }
    })
  }

  selectImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]
      this.imageFile = file
      console.log(file);
    }
  }
}
