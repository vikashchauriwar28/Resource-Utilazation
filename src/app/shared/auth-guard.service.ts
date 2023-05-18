import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./sevices/auth.service";

@Injectable()

export class AuthGuard implements CanActivate, CanActivateChild{
    constructor(private authServ : AuthService, private router : Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | any {
        return this.authServ.isAuthenticated().then((authData : any)=>{if(authData){
            return true
        }else{
            this.router.navigate(['/login'])
            return false
        }
    })
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | any {
        return this.canActivate(route,state)
    }
}