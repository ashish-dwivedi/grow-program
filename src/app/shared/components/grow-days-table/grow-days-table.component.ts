import { filter, Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import * as moment from 'moment';
import { Select } from '@ngxs/store';

import { isRequestCompleted } from '../../utils';
import { ConfirmationPromptData, GrowDay } from '../../models';
import { UserState } from '../../../core/store/user/user.state';
import { ConfirmationPromptComponent } from '../confirmation-prompt/confirmation-prompt.component';

@Component({
  selector: 'app-grow-days-table',
  templateUrl: './grow-days-table.component.html',
  styleUrls: ['./grow-days-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GrowDaysTableComponent {
  isRequestCompleted = isRequestCompleted;
  @Input() growDays: GrowDay[];
  @Input() displayedColumns: string[];

  @Output() deleteItemClicked: EventEmitter<GrowDay> = new EventEmitter<GrowDay>();
  @Output() updateGrowDayStatusClicked: EventEmitter<GrowDay> = new EventEmitter<GrowDay>();

  @Select(UserState.userId) userId$: Observable<string>;

  constructor(private readonly dialog: MatDialog) {}

  onDeleteGrowDayRequestClick(growDay: GrowDay): void {
    const dialog = this.dialog.open(ConfirmationPromptComponent, {
      width: '25vw',
      data: {
        heading: 'Delete booking request',
        message: `Are you sure you want to delete the booking request for ${moment(
          new Date(growDay?.date)
        ).format('DD.MM.YYYY')}?`,
        dismissButtonText: 'Cancel',
        confirmButtonText: 'Delete',
        confirmButtonColor: 'warn',
      } as ConfirmationPromptData,
    });
    dialog
      .afterClosed()
      .pipe(filter((closedOnConfirmation) => !!closedOnConfirmation))
      .subscribe(() => {
        this.deleteItemClicked.emit(growDay);
      });
  }

  onUpdateGrowDarRequestStatusClick(growDay: GrowDay): void {
    this.updateGrowDayStatusClicked.emit(growDay);
  }
}
