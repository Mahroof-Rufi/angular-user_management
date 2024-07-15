import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('loginToken');
    const baseURL = 'http://localhost:7000';

    let newHeaders = request.headers;
    if (token) {
      newHeaders = newHeaders.append('token', token);
    }

    const newReq = request.clone({
      url: baseURL + request.url,
      headers: newHeaders
    });

    return next.handle(newReq);
  }

}