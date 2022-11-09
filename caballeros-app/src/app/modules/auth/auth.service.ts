import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private cookieService: CookieService, private router: Router) {

  }

  verifyIsLogged(): Observable<boolean> {
    let myToken = this.cookieService.get('token'); 1
    if (!myToken) {
      this.router.navigate(['auth/login']);
    }

    let headers = new HttpHeaders({
      'Content-Type': "application/json",
      'Authorization': this.cookieService.get('token')
    });
    return this.httpClient.get<boolean>(environment.apiUrl.concat('/cliente/verifyifclientexist'), {
      headers: headers
    })
  }



  logOut(): void {
    this.cookieService.delete('token');
    this.router.navigate(['auth/login']);
  }
}
