import { ActivatedRoute } from '@angular/router';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { GrowDay } from '../../shared/models';
import { filter } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { UpdateGrowDayStatusDialogComponent } from '../update-grow-day-status-dialog/update-grow-day-status-dialog.component';

@Component({
  selector: 'app-grow-day-approval',
  templateUrl: './grow-day-approval.component.html',
  styleUrls: ['./grow-day-approval.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GrowDayApprovalComponent implements OnInit {
  allGrowDays: GrowDay[];
  displayedColumns = ['date', 'span', 'goal', 'createdBy', 'status', 'adminAction'];

  constructor(
    private readonly dialog: MatDialog,
    private readonly activatedRoute: ActivatedRoute,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.allGrowDays = this.activatedRoute.snapshot.data['allGrowDays'];
  }

  onUpdateGrowDayStatusClick(growDay: GrowDay) {
    const dialog = this.dialog.open(UpdateGrowDayStatusDialogComponent, {
      width: '30vw',
      data: growDay,
    });
    dialog
      .afterClosed()
      .pipe(filter((closedWithResults) => !!closedWithResults))
      .subscribe((updatedGrowDay: GrowDay) => {
        const index = this.allGrowDays.findIndex((growDayItem) => growDayItem._id === growDay._id);
        this.allGrowDays.splice(index, 1, updatedGrowDay);
        this.allGrowDays = [...this.allGrowDays];
        this.changeDetectorRef.markForCheck();
      });
  }
}
