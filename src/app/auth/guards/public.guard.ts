import { inject } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  CanMatchFn,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

  const checkAuthStatus= (): Observable<boolean> | boolean => {

    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.checkAuthentication()
      .pipe(
        tap( isAuthenticated => console.log('Authenticated: ', isAuthenticated) ),
        tap( isAuthenticated => {
          if (isAuthenticated) {
             router.navigate(['./']);
          }
        }),
        map( isAuthenticated => !isAuthenticated )
      )
  }

  export const canMatchFn2: CanMatchFn = ( route: Route, segments: UrlSegment[] ) => {
    return checkAuthStatus();
  }

  export const canActivateFn2: CanActivateFn = ( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) => {
    return checkAuthStatus();
  }
