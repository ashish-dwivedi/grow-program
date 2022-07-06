import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import {
  ActivatedRouteSnapshot,
  CanActivate, Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import { Select } from '@ngxs/store';

import { UserDetails } from '../../../../shared/models';
import { UserState } from '../../../store/user/user.state';
import { AppRoutes, UserRole } from '../../../../shared/enums';
import { roleRouteMapping } from '../../../../shared/constants';
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  @Select(UserState.userState) userState$: Observable<UserDetails>;

  constructor(
    private readonly router: Router,
    private readonly snackbar: MatSnackBar
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.userState$.pipe(
      switchMap((user: UserDetails) => {
        const isNavigationAllowed = user?.roles.some((userRole: UserRole) => {
          return roleRouteMapping[userRole].includes(
            state.url.replace('/', '') as AppRoutes
          );
        });
        if (!isNavigationAllowed) {
          this.snackbar.open('You do not have access to this page!');
          this.router.navigate([''])
        }
        return of(isNavigationAllowed);
      })
    );
  }
}
