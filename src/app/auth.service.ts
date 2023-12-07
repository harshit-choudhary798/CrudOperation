import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';


export const users = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' },
  { username: 'user3', password: 'password3' },
  { username: 'user4', password: 'password4' },
  { username: 'user5', password: 'password5' },
];


@Injectable({
  providedIn: 'root'
})



export class AuthService implements CanActivate{

  constructor(private router: Router) { }

  private isAuthenticated: boolean = false;

  canActivate(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  | Observable<boolean> | Promise<boolean> {

    if(sessionStorage.getItem('valid')){
      
      return true
    }

    if (this.isAuthenticated) {
      return true;
    } else {
      
      return this.router.navigate(['/login']);
    }
  }

  loginUser(enteredUsername: any, enteredPassword: any) {
    const user = users.find((u: any) => u.username === enteredUsername && u.password === enteredPassword);

    if (user) {
      this.isAuthenticated = true;
      return true;
    } else {
      
      this.isAuthenticated = false;
      return false;
    }
  }

}
