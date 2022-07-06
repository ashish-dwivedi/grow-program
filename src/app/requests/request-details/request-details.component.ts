import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserState } from '../../core/store/user/user.state';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { Select, Store } from '@ngxs/store';
import { filter, finalize, forkJoin, Observable, of, switchMap } from 'rxjs';

import { RequestStatus } from '../../shared/enums';
import { getIconForRequestType } from 'src/app/shared/utils';
import { RequestService } from '../service/request.service';
import { Request, RequestUpdate, UpdateStatusDialogResponse } from '../../shared/models';
import { UpdateRequestStatusDialogComponent } from './update-request-status-dialog/update-request-status-dialog.component';
import { StartAppLoading, StopAppLoading } from '../../core/store/app-loading/app-loading.action';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestDetailsComponent implements OnInit {
  requestDetails: Request;
  requestStatuses = RequestStatus;
  resourceRequestUpdates: RequestUpdate[];
  getIconForRequestType = getIconForRequestType;

  comment = new FormControl('');

  @Select(UserState.userId) userId$: Observable<string>;

  constructor(
    private readonly store: Store,
    private readonly dialog: MatDialog,
    private readonly activatedRoute: ActivatedRoute,
    private readonly changeDetectionRef: ChangeDetectorRef,
    private readonly requestHistoryService: RequestService
  ) {}

  ngOnInit(): void {
    this.requestDetails = this.activatedRoute.snapshot.data['requestDetails'];
    this.requestHistoryService
      .getUpdatesByRequestId(this.activatedRoute.snapshot.params['id'])
      .subscribe((resourceRequestUpdates: RequestUpdate[]) => {
        this.resourceRequestUpdates = resourceRequestUpdates;
        this.changeDetectionRef.markForCheck();
      });
  }

  onSaveCommentClick() {
    this.onResourceRequestUpdate(RequestStatus.Submitted, this.comment.value);
  }

  onResourceRequestUpdate(requestStatus: RequestStatus, comment: string = ''): void {
    this.store.dispatch(new StartAppLoading());
    this.requestHistoryService
      .saveUpdatesByRequest({
        comment,
        updateType: requestStatus,
        resourceRequestId: this.activatedRoute.snapshot.params['id'],
      })
      .pipe(
        switchMap((resourceRequestUpdate: RequestUpdate) => {
          return forkJoin([
            of(resourceRequestUpdate),
            this.requestHistoryService.getRequestDetailsById(
              resourceRequestUpdate?.resourceRequestId
            ),
          ]);
        }),
        finalize(() => this.store.dispatch(new StopAppLoading()))
      )
      .subscribe(([resourceRequestUpdate, requestDetails]) => {
        this.resourceRequestUpdates.push(resourceRequestUpdate);
        this.requestDetails = requestDetails;
        this.comment.reset();
        this.changeDetectionRef.markForCheck();
      });
  }

  getNodeIconFromUpdateType(requestStatus: RequestStatus) {
    let icon;
    switch (requestStatus) {
      case RequestStatus.Approved: {
        icon = 'done_all';
        break;
      }
      case RequestStatus.Rejected: {
        icon = 'delete';
        break;
      }
      case RequestStatus.WaitingForInput: {
        icon = 'hourglass_empty';
        break;
      }
      default: {
        icon = 'reply_all';
      }
    }
    return icon;
  }

  onUpdateStatusClick(): void {
    const dialogRef = this.dialog.open(UpdateRequestStatusDialogComponent, {
      width: '30vw',
      data: this.requestDetails,
    });
    dialogRef
      .afterClosed()
      .pipe(filter((closedWithResponse) => !!closedWithResponse))
      .subscribe((updateStatusDialogResponse: UpdateStatusDialogResponse) => {
        this.onResourceRequestUpdate(
          updateStatusDialogResponse?.status,
          updateStatusDialogResponse?.comment
        );
      });
  }
}
