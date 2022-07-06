import { Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { UserDetails } from '../../../shared/models';
import { UserService } from '../../../core/services/user/user.service';
import { Store } from '@ngxs/store';
import {
  StartAppLoading,
  StopAppLoading,
} from '../../../core/store/app-loading/app-loading.action';

@Injectable({
  providedIn: 'root',
})
export class BudgetOverviewResolver implements Resolve<UserDetails[]> {
  constructor(private readonly store: Store, private readonly userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserDetails[]> {
    this.store.dispatch(new StartAppLoading());
    return this.userService
      .getAllUserDetails()
      .pipe(tap(() => this.store.dispatch(new StopAppLoading())));
  }
}
