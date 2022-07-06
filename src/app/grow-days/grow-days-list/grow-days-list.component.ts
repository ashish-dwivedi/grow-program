import { filter, finalize, Observable } from 'rxjs'
import { ActivatedRoute } from '@angular/router';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';

import * as moment from 'moment';

import { GrowDay, UserDetails } from '../../shared/models'
import { GrowDaySpan, GrowDayStatus } from '../../shared/enums';
import { NewGrowDayComponent } from '../new-grow-day/new-grow-day.component';
import { GrowDaysService } from '../service/grow-days.service';
import { StartAppLoading, StopAppLoading } from '../../core/store/app-loading/app-loading.action';
import { Select, Store } from '@ngxs/store'
import { MatSnackBar } from '@angular/material/snack-bar'
import { UserState } from '../../core/store/user/user.state'
import { getMonthsRemainingSpan } from '../../shared/utils'

@Component({
  selector: 'app-grow-days-list',
  templateUrl: './grow-days-list.component.html',
  styleUrls: ['./grow-days-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GrowDaysListComponent implements OnInit {
  allUserGrowDays: GrowDay[];
  displayedColumns = ['date', 'span', 'goal', 'status', 'action'];

  @ViewChild(MatTable) table: MatTable<GrowDay>;

  @Select(UserState.userState) userState$: Observable<UserDetails>;

  constructor(
    private readonly store: Store,
    private readonly dialog: MatDialog,
    private readonly snackbar: MatSnackBar,
    private readonly activatedRoute: ActivatedRoute,
    private readonly growDaysService: GrowDaysService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.allUserGrowDays = this.activatedRoute.snapshot.data['allGrowDays'];
  }

  // currentMonthActiveBookings(): GrowDay[] {
  //   return this.allUserGrowDays.filter(
  //     (growDay: GrowDay) =>
  //       growDay.status !== GrowDayStatus.Rejected && moment().isSame(moment(growDay?.date), 'month')
  //   );
  // }

  isCurrentMonthBooked(): boolean {
    return !getMonthsRemainingSpan(this.allUserGrowDays, moment().get('month'));
  }

  onApplyGrowDayClick() {
    const dialog = this.dialog.open(NewGrowDayComponent, {
      width: '60vw',
      data: this.allUserGrowDays
    });
    dialog
      .afterClosed()
      .pipe(filter((value) => !!value))
      .subscribe((newGrowDay: GrowDay) => {
        this.allUserGrowDays.unshift(newGrowDay);
        this.allUserGrowDays = [...this.allUserGrowDays];
        this.changeDetectorRef.markForCheck();
        this.table.renderRows();
      });
  }

  isBookingWindowForNextMonthOpen(): boolean {
    const endOfMonth = moment().endOf('month');
    const allowedWindow = moment().endOf('month').subtract(5, 'day');
    return moment().isSameOrAfter(allowedWindow) && moment().isSameOrBefore(endOfMonth);
  }

  onDeleteGrowDayClick(growDay: GrowDay): void {
    const index = this.allUserGrowDays.findIndex((growDayItem) => growDayItem?._id === growDay._id);
    this.store.dispatch(new StartAppLoading());
    this.growDaysService
      .deleteGrowDay(growDay._id)
      .pipe(finalize(() => this.store.dispatch(new StopAppLoading())))
      .subscribe(() => {
        this.allUserGrowDays.splice(index, 1);
        this.allUserGrowDays = [...this.allUserGrowDays];
        this.changeDetectorRef.markForCheck();
      }, (err) => {
        this.snackbar.open(err?.error?.message);
      });
  }
}
