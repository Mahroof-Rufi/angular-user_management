import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginINComponent } from './components/login-in/login-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component'
import { StoreModule } from '@ngrx/store';
import { userReducer } from './services/store/users.reducer';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminListUsersComponent } from './components/admin-list-users/admin-list-users.component';
import { AdminEditUserComponent } from './components/admin-edit-user/admin-edit-user.component';
import { AdminAddUserComponent } from './components/admin-add-user/admin-add-user.component';
import { ErrorComponentComponent } from './components/error-component/error-component.component';
import { AuthInterceptor } from './services/inteceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginINComponent,
    SignUpComponent,
    HomeComponent,
    EditProfileComponent,
    AdminLoginComponent,
    AdminListUsersComponent,
    AdminEditUserComponent,
    AdminAddUserComponent,
    ErrorComponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({ user:userReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  providers: [
    { provide:HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
