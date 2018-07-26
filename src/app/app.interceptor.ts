import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(private router: Router, private snackBar: MatSnackBar) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req.clone();

    if (req.url !== '/config-web/auth') {
      authReq = authReq.clone({headers: authReq.headers.set('Authorization', 'Bearer ' + window.sessionStorage.getItem('token'))})
    }

    return next.handle(authReq).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {

          }
        },
        err => {
          let msg = '没有权限，请重新登录';
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/login']);
              this.snackBar.open(msg, '', {
                duration: 5000
              })
            }
            else {
              msg = (err.error && err.error.error && err.error.error.message) || '操作失败，请联系管理员';
              this.snackBar.open(msg, '', {
                duration: 5000
              })
            }
          }
        }
      )
    );
  }
}
