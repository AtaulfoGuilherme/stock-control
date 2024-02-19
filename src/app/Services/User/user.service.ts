import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/Environments/environments';
import { SignupUserRequest } from 'src/app/Models/Interfaces/User/SignupUserRequest';
import { signupUserResponse } from 'src/app/Models/Interfaces/User/SignupUserResponse';
import { AuthRequest } from 'src/app/Models/Interfaces/User/auth/AuthRequest';
import { AuthResponse } from 'src/app/Models/Interfaces/User/auth/AuthResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 private API_URL = environment.API_URL


  constructor(private http: HttpClient, private cookie: CookieService) { }

  signupUser(requestDatas: SignupUserRequest): Observable<signupUserResponse> {
    return this.http.post<signupUserResponse> (
      `${this.API_URL}/user` , requestDatas
    );
  }

authUser(requestDatas: AuthRequest): Observable<AuthResponse> {
  return this.http.post<AuthResponse>(`${this.API_URL}/auth` , requestDatas)
}

isLoggedIn(): boolean{
  const JWT_TOKEN = this.cookie.get('USER_INFO');
  return JWT_TOKEN ? true : false;
}

}
