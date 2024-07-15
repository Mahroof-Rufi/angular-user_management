import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-admin-list-users',
  templateUrl: './admin-list-users.component.html',
  styleUrls: ['./admin-list-users.component.css']
})
export class AdminListUsersComponent implements OnInit {

  usersData: any = []
  searchInput: string = ''
  debounceTimer: any;
  errorMess: string = ''

  constructor(private service: UsersService) { }

  ngOnInit(): void {
    this.service.fetchUsers().subscribe((res: any) => {
      this.usersData = res
      console.log(this.usersData);

    })
  }

  deleteUser(id: string) {
    this.service.deleteUser(id)
    this.service.fetchUsers().subscribe((res: any) => {
      this.usersData = res
    })
  }

  serchUser(event: any) {
    this.searchInput = event.target.value;
    if (this.searchInput == '') {
      return
    }
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => this.searchResult(), 1500);
    return
  }

  searchResult() {
    console.log('search started');

    this.service.searchUser(this.searchInput).subscribe(
      (users: any) => {
        console.log('before');

        console.log(this.usersData);
        this.usersData = users;
        console.log('after');

        console.log(this.usersData);

      },
      error => {
        this.errorMess = error.error
      }
    );

  }
}
