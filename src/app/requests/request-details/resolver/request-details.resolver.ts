import { catchError, Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { Store } from '@ngxs/store';

import { Request } from '../../../shared/models';
import { RequestService } from '../../service/request.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  StartAppLoading,
  StopAppLoading,
} from '../../../core/store/app-loading/app-loading.action';

@Injectable({
  providedIn: 'root',
})
export class RequestDetailsResolver implements Resolve<Request> {
  constructor(
    private readonly store: Store,
    private readonly snackbar: MatSnackBar,
    private readonly requestDetailsService: RequestService
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Request> {
    this.store.dispatch(new StartAppLoading());
    return this.requestDetailsService.getRequestDetailsById(route.params['id']).pipe(
      tap(() => this.store.dispatch(new StopAppLoading())),
      catchError((err) => {
        this.snackbar.open(err?.error?.message);
        throw new Error(err);
      })
    );
  }
}
