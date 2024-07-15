import { ErrorComponentComponent } from './components/error-component/error-component.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginINComponent } from './components/login-in/login-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminListUsersComponent } from './components/admin-list-users/admin-list-users.component';
import { AdminEditUserComponent } from './components/admin-edit-user/admin-edit-user.component';
import { AdminAddUserComponent } from './components/admin-add-user/admin-add-user.component';
import { authGuardGuard } from './services/guards/auth-guard.guard';
import { adminAuthGuard } from './services/guards/admin-auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginINComponent },
  { path: 'register', component: SignUpComponent },
  {
    path: '', children: [
      { path: 'home', component: HomeComponent, },
      { path: 'edit', component: EditProfileComponent },
    ]
  },
  { path: 'admin', component: AdminLoginComponent },
  {
    path: 'admin', canActivateChild: [adminAuthGuard], children: [
      { path: 'list', component: AdminListUsersComponent },
      { path: 'edit-user/:id', component: AdminEditUserComponent },
      { path: 'add-user', component: AdminAddUserComponent },
    ]
  },
  { path: '**', component: ErrorComponentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
