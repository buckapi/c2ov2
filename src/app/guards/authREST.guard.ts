
import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
// import { USER_STORAGE_KEY } from "@shared/constants/constant";
import { AuthRESTService } from '@services/authREST.service';
import { Butler } from "@services/butler.service";
@Injectable({ providedIn: 'root' })
export class AuthRESTGuard implements CanActivate {
  constructor(
  public _butler:Butler, 
    private authRESTService: AuthRESTService,
    private  router: Router
    ){ }

  canActivate(){
    if (this.authRESTService.getCurrentUser() && this._butler.isLogged){
      return true;
    }else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}