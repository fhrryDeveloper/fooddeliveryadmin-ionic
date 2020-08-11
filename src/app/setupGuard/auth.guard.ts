import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApisService } from '../services/apis.service';

@Injectable({
  providedIn: 'root'
})
export class SetupAuthGuard implements CanActivate {

  constructor(private authServ: ApisService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): any {
    return this.authServ.getAdmin().then(user => {
      if (user && user.length > 0) {
        return true;
      } else {
        this.router.navigate(['/setup']);
      }
    }).catch(error => {
      console.log(error);
      this.router.navigate(['/setup']);
    });
  }
}
