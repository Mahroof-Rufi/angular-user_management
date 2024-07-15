import { CanActivateChildFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuardGuard: CanActivateChildFn = (route, state) => {


  const router: Router = inject(Router);

  const token = localStorage.getItem('loginToken');

  if (token) {
    return true
  } else {
    router.navigateByUrl('login');
    return false
  }


};