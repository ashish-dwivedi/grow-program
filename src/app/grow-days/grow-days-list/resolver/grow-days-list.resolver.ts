import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';

import { Select, Store } from '@ngxs/store';
import { AuthService } from '@auth0/auth0-angular';

import { GrowDay } from '../../../shared/models';
import { UserState } from '../../../core/store/user/user.state';
import { GrowDaysService } from '../../service/grow-days.service';
import {
  StartAppLoading,
  StopAppLoading,
} from '../../../core/store/app-loading/app-loading.action';

@Injectable({
  providedIn: 'root',
})
export class GrowDaysListResolver implements Resolve<GrowDay[]> {
  @Select(UserState.userId) userId$: Observable<string>;

  constructor(
    private readonly store: Store,
    private readonly authService: AuthService,
    private readonly growDaysService: GrowDaysService
  ) {}
  resolve(): Observable<GrowDay[]> {
    this.store.dispatch(new StartAppLoading());
    return this.growDaysService
      .getUserGrowDays(this.store.selectSnapshot(UserState.userId) as string)
      .pipe(tap(() => this.store.dispatch(StopAppLoading)));
  }
}
