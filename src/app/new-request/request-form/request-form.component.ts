import { finalize, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';

import { Select, Store } from '@ngxs/store';

import { Request } from '../../shared/models';
import { ResourceType } from '../../shared/enums';
import { UserState } from '../../core/store/user/user.state';
import { NewRequestService } from '../service/new-request.service';
import { FetchUpdatedUserDetails } from '../../core/store/user/user.action';
import { StartAppLoading, StopAppLoading } from '../../core/store/app-loading/app-loading.action';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestFormComponent implements OnInit {
  requestForm: FormGroup;
  resourceTypes = Object.values(ResourceType) as ResourceType[];
  @ViewChild('formGroupDirective') formGroupDirective: NgForm;

  @Select(UserState.remainingBudget) remainingBudget$: Observable<number>;

  constructor(
    private readonly store: Store,
    private readonly router: Router,
    private readonly snackbar: MatSnackBar,
    private readonly formBuilder: FormBuilder,
    private readonly requestResourceService: NewRequestService
  ) {}

  ngOnInit(): void {
    this.requestForm = this.formBuilder.group({
      resourceType: ['', Validators.required],
      title: ['', Validators.required],
      resourceDescription: ['', Validators.required],
      resourceUrl: [
        '',
        [
          Validators.required,
          Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'),
        ],
      ],
      shippingAddress: ['', Validators.required],
      estimatedCost: ['', Validators.required],
      justification: [''],
    });
  }

  compareFxn(item1: string, item2: string): boolean {
    return item1 === item2;
  }

  onFormSubmit(): void {
    this.store.dispatch(new StartAppLoading());
    this.requestResourceService
      .submitNewResourceRequest(this.requestForm.value)
      .pipe(finalize(() => this.store.dispatch(new StopAppLoading())))
      .subscribe((newResourceRequest: Request) => {
        this.store.dispatch(new FetchUpdatedUserDetails());
        this.formGroupDirective.reset();
        const snackbarRef = this.snackbar.open(
          `Request for ${newResourceRequest?.title} submitted`,
          'Go to request',
          {
            duration: 10000,
          }
        );
        snackbarRef.onAction().subscribe(() => {
          this.router.navigate([`requests/${newResourceRequest?._id}`]);
        });
      });
  }
}
