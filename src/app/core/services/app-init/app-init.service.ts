import { Injectable } from '@angular/core';

import { Store } from '@ngxs/store';
import { AuthService, User } from '@auth0/auth0-angular';
import { catchError, Observable, of, switchMap } from 'rxjs';

import { UserService } from '../user/user.service';
import { UserDetails } from '../../../shared/models';
import { SetUserDetails } from '../../store/user/user.action';

@Injectable({
  providedIn: 'root',
})
export class AppInitService {
  constructor(
    private readonly store: Store,
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  initialize(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.authService.isAuthenticated$
        .pipe(
          switchMap((isAuthenticated: boolean) => {
            if (isAuthenticated) {
              return this.authService.user$ as Observable<User>;
            }
            this.authService.loginWithRedirect();
            return of({} as User);
          }),
          switchMap((user: User) => {
            return this.userService.getUserDetailsBySubjectId(
              user?.sub as string
            );
          }),
          catchError((err) => {
            reject(err);
            throw new Error(err);
          })
        )
        .subscribe((userDetails: UserDetails) => {
          this.store.dispatch(new SetUserDetails(userDetails));
          resolve();
        });
    });
  }
}
