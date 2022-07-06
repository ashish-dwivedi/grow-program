import { filter, finalize, switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { Store } from '@ngxs/store';

import { RequestService } from '../service/request.service';
import { ConfirmationPromptData, Request, RequestFilter } from '../../shared/models';
import { StartAppLoading, StopAppLoading } from '../../core/store/app-loading/app-loading.action';
import { ConfirmationPromptComponent } from '../../shared/components/confirmation-prompt/confirmation-prompt.component';

@Component({
  selector: 'app-request-history-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestListComponent implements OnInit {
  dataSource: Request[];
  displayedColumns: string[] = [
    'title',
    'resourceType',
    'estimatedCost',
    'creationDate',
    'lastModifiedOn',
    'status',
    'action',
  ];

  constructor(
    private readonly store: Store,
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly snackbar: MatSnackBar,
    private readonly activatedRoute: ActivatedRoute,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly requestHistoryService: RequestService
  ) {}

  ngOnInit(): void {
    this.dataSource = this.activatedRoute.snapshot.data['requestHistoryList'];
  }

  onDeleteResourceRequestClick(resourceRequest: Request): void {
    const dialog = this.dialog.open(ConfirmationPromptComponent, {
      width: '25vw',
      data: {
        heading: 'Confirm Delete',
        message: `Are you sure you want to delete the request for <strong>${resourceRequest?.title}</strong>?`,
        confirmButtonText: 'Delete',
        dismissButtonText: 'Dismiss',
        confirmButtonColor: 'warn',
      } as ConfirmationPromptData,
    });
    dialog
      .afterClosed()
      .pipe(
        filter((closedOnConfirmation) => !!closedOnConfirmation),
        switchMap(() => {
          this.store.dispatch(new StartAppLoading());
          return this.requestHistoryService.deleteResourceRequest(resourceRequest?._id);
        }),
        finalize(() => this.store.dispatch(new StopAppLoading()))
      )
      .subscribe(() => {
        const index = this.dataSource.findIndex(
          (resourceRequestItem) => resourceRequestItem._id === resourceRequest._id
        );
        this.dataSource.splice(index, 1);
        this.dataSource = [...this.dataSource];
        this.changeDetectorRef.markForCheck();
        this.snackbar.open('Request deleted!');
      });
  }

  onFilterChange(filters: RequestFilter) {
    this.store.dispatch(new StartAppLoading());
    this.requestHistoryService
      .getRequestsByCurrentUser(filters)
      .pipe(finalize(() => this.store.dispatch(new StopAppLoading())))
      .subscribe((filteredRequests: Request[]) => {
        this.dataSource = [...filteredRequests];
        this.changeDetectorRef.markForCheck();
      });
  }

  onResourceRequestClick(resourceRequest: Request) {
    this.router.navigate([`requests/${resourceRequest?._id}`]);
  }
}
