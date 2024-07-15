import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { userState } from './store/user.model';
import { Observable } from 'rxjs';
import { initialAdd } from './store/users.actions';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // constructor
  constructor(private http: HttpClient, private router: Router, private store: Store<{ user: userState }>) { }


  // register method for users
  registerUser(formData: any): Observable<any> {
    return this.http.post("/signup", formData);
  }


  // login method for users
  userLogin(userData: any): Observable<any> {
    return this.http.post("/login", userData)
  }


  // method to rewrite the state data
  updateState() {
    const stateData: any = localStorage.getItem('stateData');
    const parsedData = JSON.parse(stateData);

    // Ensure parsedData has the data property
    if (parsedData) {
      this.store.dispatch(initialAdd({ data: parsedData }));
    } else {
      console.error('Missing or invalid data in localStorage');
      // Handle the case where data is missing or invalid
    }
  }



  // // method to authenticate users
  // auth() {
  //   return this.http.get("/home")
  // }


  // method to update user data from admin side
  updateUser(userData: any) {
    console.log('here ');
    console.log(userData);


    return this.http.put("/updateprofile", userData)
  }


  // method to login admin
  adminLogin(email: string, password: string) {
    this.http.post("/admin/login", { email, password }).subscribe((res: any) => {
      console.log(res);
      if (res.status === true) {
        localStorage.setItem('adminToken', res.token);
        this.router.navigateByUrl('/admin/list');
      }
    })
  }


  // method to fetch user details to admin side
  fetchUsers(): Observable<any> {
    return this.http.get("/admin/list")
  }


  // method to delete user from admin side 
  deleteUser(userId: any) {
    this.http.delete(`/admin/delete`, { body: { userId } }).subscribe((res: any) => {
      console.log(res);
    });
  }


  // method to fetch user data using ID from admin side
  fetchUserById(userId: any) {
    return this.http.get(`/admin/edituser/${userId}`)
  }


  // method to search users in admin side
  searchUser(data: any) {
    return this.http.post("/admin/search", { data: data });
  }


  // method to add new user from admin side 
  addUser(userData: any) {

    return this.http.post("/admin/adduser", userData)
  }
}
