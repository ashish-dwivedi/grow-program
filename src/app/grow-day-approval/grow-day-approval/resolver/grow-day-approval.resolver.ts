import { finalize, Observable } from 'rxjs';
import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';

import { Store } from '@ngxs/store';

import { GrowDay } from '../../../shared/models';
import { GrowDaysService } from '../../../grow-days/service/grow-days.service';
import {
  StartAppLoading,
  StopAppLoading,
} from '../../../core/store/app-loading/app-loading.action';

@Injectable({
  providedIn: 'root',
})
export class GrowDayApprovalResolver implements Resolve<GrowDay[]> {
  constructor(private readonly store: Store, private readonly growDayService: GrowDaysService) {}
  resolve(): Observable<GrowDay[]> {
    this.store.dispatch(new StartAppLoading());
    return this.growDayService
      .getAllGrowDays()
      .pipe(finalize(() => this.store.dispatch(new StopAppLoading())));
  }
}
