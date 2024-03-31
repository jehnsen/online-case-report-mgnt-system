import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
      private tokenStorage: TokenStorageService ,
      private router: Router
    ){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token = this.tokenStorage.getToken()
      if(token){
        if(state.url === '/'){
          this.router.navigate(['/records'])
        }
        return true;
      } else {
        return this.router.navigate([''])
      }
    
  }
  
}
