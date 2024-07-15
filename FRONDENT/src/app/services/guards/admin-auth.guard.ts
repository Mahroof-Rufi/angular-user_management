import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';

export const adminAuthGuard: CanActivateChildFn = (childRoute, state) => {

  const router: Router = inject(Router);

  const token = localStorage.getItem('adminToken');

  if (token) {
    return true
  } else {
    router.navigateByUrl('/admin');
    return false
  }

};
