import { Router, UrlTree } from '@angular/router';
import { UserService } from './../Services/User/user.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(
    private UserService: UserService,
    private router: Router) { }

canActivate():
| Observable<boolean | UrlTree>
| Promise<boolean | UrlTree>
| boolean
| UrlTree {

if (!this.UserService.isLoggedIn()) {
this.router.navigate(['/home']);
return false;
}

this.UserService.isLoggedIn();
return true;

}
}
