import { Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { Request } from '../../../shared/models';
import { RequestService } from '../../service/request.service';
import {
  StartAppLoading,
  StopAppLoading,
} from '../../../core/store/app-loading/app-loading.action';
import { Store } from '@ngxs/store';

@Injectable({
  providedIn: 'root',
})
export class RequestListResolver implements Resolve<Request[]> {
  constructor(
    private readonly store: Store,
    private readonly requestHistoryService: RequestService
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Request[]> {
    this.store.dispatch(new StartAppLoading());
    return this.requestHistoryService
      .getRequestsByCurrentUser()
      .pipe(tap(() => this.store.dispatch(new StopAppLoading())));
  }
}
