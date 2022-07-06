import { Injectable } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { Store } from '@ngxs/store';

import { User } from '../../../shared/models';
import { AuthService } from '@auth0/auth0-angular';
import { UserService } from '../../../core/services/user/user.service';
import {
  StartAppLoading,
  StopAppLoading,
} from '../../../core/store/app-loading/app-loading.action';

@Injectable({
  providedIn: 'root',
})
export class UserOverviewResolver implements Resolve<User> {
  constructor(
    private readonly store: Store,
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    this.store.dispatch(new StartAppLoading());
    return this.authService.getUser().pipe(
      switchMap((user) => {
        return this.userService
          .getUserDetailsBySubjectId(user?.sub || '')
          .pipe(tap(() => this.store.dispatch(new StopAppLoading())));
      })
    );
  }
}
