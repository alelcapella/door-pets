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
    return this.lockService.gethouseLocks().pipe(
      map((houseLocks: string[]) => {
        const isAllLocksOpenExceptCentral = this.areAllLocksOpenExceptCentral(houseLocks);
        console.log(houseLocks);
        console.log(isAllLocksOpenExceptCentral);
        if (isAllLocksOpenExceptCentral) {
          return true;
        } else {
          return this.router.createUrlTree(['/']);
        }
      })
    );
  }
  private areAllLocksOpenExceptCentral(houseLocks: string[]): boolean {
    return houseLocks.every((lock, index) => (index !== 2 && lock === 'lock_open') || (index === 2 && lock === 'lock'));
  }
}

@Injectable({
  providedIn: 'root'
})
export class HouseAuthGuard implements CanActivate {
  constructor(private permissionsService: PermissionsService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.permissionsService.canActivate(route, state);
  }
}
