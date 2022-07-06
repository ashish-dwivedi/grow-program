import { finalize, of, switchMap } from 'rxjs';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import * as moment from 'moment';
import { Store } from '@ngxs/store';

import { GrowDaySpan } from '../../shared/enums';
import { UserState } from '../../core/store/user/user.state';
import { GrowDaysService } from '../service/grow-days.service';
import { ConfirmationPromptData, GrowDay, NewGrowDayPayload } from '../../shared/models';
import { ConfirmationPromptComponent } from '../../shared/components/confirmation-prompt/confirmation-prompt.component';
import { StartAppLoading, StopAppLoading } from '../../core/store/app-loading/app-loading.action';
import { getMonthsRemainingSpan } from '../../shared/utils';

type MonthWiseSpan = GrowDaySpan | '';

@Component({
  selector: 'app-new-grow-day',
  templateUrl: './new-grow-day.component.html',
  styleUrls: ['./new-grow-day.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewGrowDayComponent implements OnInit {
  growDayForm: FormGroup;
  allowedSpansForSelectedMonth: GrowDaySpan[] = [];
  minDate = moment().add(5, 'day').toDate();
  monthWiseSpan: MonthWiseSpan[] = Array(12).fill('');

  get date(): AbstractControl {
    return this.growDayForm?.get('date') as AbstractControl;
  }

  get span(): AbstractControl {
    return this.growDayForm?.get('span') as AbstractControl;
  }

  constructor(
    private readonly store: Store,
    private readonly dialog: MatDialog,
    private readonly formBuilder: FormBuilder,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly growDaysService: GrowDaysService,
    @Inject(MAT_DIALOG_DATA) public allUserGrowDays: GrowDay[],
    private readonly dialogRef: MatDialogRef<NewGrowDayComponent>
  ) {}

  ngOnInit(): void {
    this.growDayForm = this.formBuilder.group({
      date: ['', Validators.required],
      span: [{ value: '', disabled: true }, Validators.required],
      goal: ['', Validators.required],
      teamApprovalConfirmed: [''],
    });
    this.monthWiseSpan.forEach((item: MonthWiseSpan, index: number) => {
      const thisMonthsSpan = getMonthsRemainingSpan(this.allUserGrowDays, index);
      this.monthWiseSpan[index] = thisMonthsSpan ? thisMonthsSpan : ('' as any);
      this.changeDetectorRef.markForCheck();
    });
    this.date?.valueChanges.subscribe((value) => {
      this.span.setValue('');
      this.span.disable();
      if (value) {
        const selectedMonth = moment(this.date?.value).get('month');
        const availableSpanForThisMonth = this.monthWiseSpan[selectedMonth];
        switch (availableSpanForThisMonth) {
          case GrowDaySpan.FullDay: {
            this.span.enable();
            this.allowedSpansForSelectedMonth = Object.values(GrowDaySpan);
            break;
          }
          case GrowDaySpan.HalfDay: {
            this.span.enable();
            this.allowedSpansForSelectedMonth = [GrowDaySpan.HalfDay];
            break;
          }
        }
      } else {
        this.allowedSpansForSelectedMonth = [];
      }
      this.changeDetectorRef.markForCheck();
    });
  }

  onSubmitClick(): void {
    let confirmationObservable;
    if (!!this.growDayForm?.get('teamApprovalConfirmed')?.value) {
      confirmationObservable = of(true);
    } else {
      const dialog = this.dialog.open(ConfirmationPromptComponent, {
        width: '25vw',
        data: {
          heading: 'Confirm Team Availability',
          message:
            'The HR team does not check your team availability, please make sure to do it yourself!',
          dismissButtonText: 'OK',
        } as ConfirmationPromptData,
      });
      confirmationObservable = dialog.afterClosed();
    }
    confirmationObservable
      .pipe(
        switchMap(() => {
          const payload: NewGrowDayPayload = {
            createdById: this.store.selectSnapshot(UserState.userId) as string,
            createdByName: this.store.selectSnapshot(UserState.userName) as string,
            date: (this.growDayForm?.get('date')?.value as Date).toISOString(),
            span: this.growDayForm?.get('span')?.value,
            goal: this.growDayForm?.get('goal')?.value,
            creationDate: new Date().toISOString(),
          };
          this.store.dispatch(new StartAppLoading());
          return this.growDaysService.submitNewGrowDayRequest(payload);
        }),
        finalize(() => this.store.dispatch(new StopAppLoading()))
      )
      .subscribe((newGrowDay: GrowDay) => {
        this.dialogRef.close(newGrowDay);
      });
  }

  dateFilter = (date: Date | null): boolean => {
    const month = (date || new Date()).getMonth();
    return !!this.monthWiseSpan[month];
  };
}
