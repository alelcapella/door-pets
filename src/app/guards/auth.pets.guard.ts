import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { LockService } from '../services/lock-service';

@Injectable({
  providedIn: 'root'
})
export class PermissionsPetsService {

  constructor(
    private lockService: LockService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.lockService.getPasswordLock().pipe(
      map((passwordLock: string) => {
        if (passwordLock === 'lock_open') {
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
export class PetsAuthGuard implements CanActivate {
  constructor(private permissionsPetsService: PermissionsPetsService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.permissionsPetsService.canActivate(route, state);
  }
}
