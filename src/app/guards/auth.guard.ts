import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { LockService } from '../services/lock-service';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  constructor(
    private lockService: LockService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.lockService.getBigLock().pipe(
      map((bigLockValue: string) => {
        if (bigLockValue === 'lock_open') {
          return true;
        } else {
          return this.router.createUrlTree(['/']);
        }
      })
    );
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private permissionsService: PermissionsService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.permissionsService.canActivate(route, state);
  }
}
