import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-admin-edit-user',
  templateUrl: './admin-edit-user.component.html',
  styleUrls: ['./admin-edit-user.component.css']
})
export class AdminEditUserComponent implements OnInit {

  userId: any = ''
  imageFile: any;
  UserData = {
    id: '',
    fullName: '',
    about: '',
    email: '',
    image: '',
  }


  constructor(private activatedRoute: ActivatedRoute, private service: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.userId = params.get('id');
    })

    this.service.fetchUserById(this.userId).subscribe((res: any) => {
      this.UserData.id = res.userData._id
      this.UserData.fullName = res.userData.fullName
      this.UserData.about = res.userData.about
      this.UserData.email = res.userData.email
      this.UserData.image = res.userData.image
    })
  }

  onEdit() {
    const formData = new FormData()
    formData.append('id', this.UserData.id)
    formData.append('fullName', this.UserData.fullName)
    formData.append('email', this.UserData.email)
    formData.append('image', this.UserData.image)
    formData.append('about', this.UserData.about)

    if (this.imageFile) {
      const blob = new Blob([this.imageFile], { type: this.imageFile.type });
      formData.append('file', blob, this.imageFile.name);
    }
    console.log('added file here');
    console.log(this.imageFile);



    this.service.updateUser(formData).subscribe((res: any) => {

    })
    this.router.navigateByUrl('/admin/list')
  }

  selectImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]
      this.imageFile = file
      console.log(file);
    }
  }
}
