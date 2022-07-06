import { finalize } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';

import { Store } from '@ngxs/store';

import { GrowDayStatus } from '../../shared/enums';
import { GrowDay, GrowDayStatusUpdatePayload } from '../../shared/models';
import { GrowDaysService } from '../../grow-days/service/grow-days.service';
import {
  StartAppLoading,
  StopAppLoading,
} from '../../core/store/app-loading/app-loading.action';

@Component({
  selector: 'app-update-grow-date-status-dialog',
  templateUrl: './update-grow-day-status-dialog.component.html',
  styleUrls: ['./update-grow-day-status-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateGrowDayStatusDialogComponent {
  growDayStatus = GrowDayStatus;

  constructor(
    private readonly store: Store,
    @Inject(MAT_DIALOG_DATA) public growDay: GrowDay,
    private readonly growDaysService: GrowDaysService,
    private readonly dialogRef: MatDialogRef<UpdateGrowDayStatusDialogComponent>
  ) {}

  onUpdateBookingStatusClick(status: GrowDayStatus.Approved | GrowDayStatus.Rejected): void {
    const payload: GrowDayStatusUpdatePayload = {
      status,
      lastModifiedOn: new Date().toISOString(),
    };
    this.store.dispatch(new StartAppLoading());
    this.growDaysService
      .updateGrowDayStatus(this.growDay._id, payload)
      .pipe(finalize(() => this.store.dispatch(new StopAppLoading())))
      .subscribe((updatedGrowDay: GrowDay) => {
        this.dialogRef.close(updatedGrowDay);
      });
  }
}
