import { finalize } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { Store } from '@ngxs/store';

import { Request, RequestFilter } from '../../shared/models';
import { RequestService } from '../../requests/service/request.service';
import { StartAppLoading, StopAppLoading } from '../../core/store/app-loading/app-loading.action';

@Component({
  selector: 'app-request-approval',
  templateUrl: './request-approval.component.html',
  styleUrls: ['./request-approval.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestApprovalComponent implements OnInit {
  allApprovalPendingRequests: Request[];
  displayedColumns: string[] = [
    'title',
    'resourceType',
    'estimatedCost',
    'creationDate',
    'createdBy',
    'lastModifiedOn',
    'status',
  ];

  constructor(
    private readonly store: Store,
    private readonly router: Router,
    private readonly requestService: RequestService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.allApprovalPendingRequests = this.activatedRoute.snapshot.data['pendingRequests'];
  }

  onRequestRowClicked(resourceRequest: Request): void {
    this.router.navigate([`requests/${resourceRequest?._id}`]);
  }

  onFilterChange(filters: RequestFilter) {
    this.store.dispatch(new StartAppLoading());
    this.requestService
      .getAllRequests(filters)
      .pipe(finalize(() => this.store.dispatch(new StopAppLoading())))
      .subscribe((requests) => {
        this.allApprovalPendingRequests = requests;
        this.changeDetectorRef.markForCheck();
      });
  }
}
