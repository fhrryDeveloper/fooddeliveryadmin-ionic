import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApisService } from '../services/apis.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authServ: ApisService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot): any {
        // /// You can use this one for better security
        // /// You can use this one for better security
        // /// You can use this one for better security
        return this.authServ.checkAuth().then(user => {
            if (user) {
                return true;
            } else {
                this.router.navigate(['/auth/login']);
            }
        }).catch(error => {
            console.log(error);
            this.router.navigate(['/auth/login']);
        });


        // ///// Less Secure but faster
        // const uid = localStorage.getItem('uid');
        // console.log('uid', localStorage.getItem('uid'));
        // if (uid && uid != null && uid !== 'null') {
        //     return true;
        // }
        // this.router.navigate(['/auth/login']);
        // return false;
    }
}
