import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { Request } from '../../../shared/models';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { RequestStatus } from '../../../shared/enums';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-update-request-status-dialog',
  templateUrl: './update-request-status-dialog.component.html',
  styleUrls: ['./update-request-status-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateRequestStatusDialogComponent implements OnInit {
  updateButtonColor: ThemePalette = 'accent';
  requestStatusUpdateForm: FormGroup;
  allowedStatuses = Object.values(RequestStatus);

  statusToAllowedStatusMapping = {
    [RequestStatus.Submitted]: {
      allowedStatuses: [
        RequestStatus.Approved,
        RequestStatus.Rejected,
        RequestStatus.WaitingForInput,
      ],
      buttonColor: 'accent',
      commentOptional: true,
    },
    [RequestStatus.WaitingForInput]: {
      allowedStatuses: [RequestStatus.Approved, RequestStatus.Rejected],
      buttonColor: 'accent',
      commentOptional: false,
    },
    [RequestStatus.Approved]: {
      allowedStatuses: [RequestStatus.Completed],
      buttonColor: 'primary',
      commentOptional: true,
    },
    [RequestStatus.Rejected]: {
      allowedStatuses: [RequestStatus.Completed],
      buttonColor: 'warn',
      commentOptional: false,
    },
    [RequestStatus.Completed]: {
      allowedStatuses: [],
      buttonColor: 'primary',
      commentOptional: true,
    },
  };

  constructor(
    private readonly formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public requestDetails: Request,
    private readonly dialogRef: MatDialogRef<UpdateRequestStatusDialogComponent>,
  ) {}

  ngOnInit(): void {
    this.requestStatusUpdateForm = this.formBuilder.group({
      newStatus: ['', Validators.required],
      comment: [''],
    });
    this.allowedStatuses =
      this.statusToAllowedStatusMapping[
        this.requestDetails?.requestStatus
      ].allowedStatuses;
    this.requestStatusUpdateForm
      .get('newStatus')
      ?.valueChanges.subscribe((newStatus: RequestStatus) => {
        const commentControl = this.requestStatusUpdateForm.get('comment');
        if (!this.statusToAllowedStatusMapping[newStatus].commentOptional) {
          commentControl?.addValidators(Validators.required);
        } else {
          commentControl?.removeValidators(Validators.required);
        }
        commentControl?.updateValueAndValidity();
        this.updateButtonColor = this.statusToAllowedStatusMapping[newStatus]
          ?.buttonColor as ThemePalette;
      });
  }

  onUpdateRequestClick(): void {
    this.dialogRef.close({
      status: this.requestStatusUpdateForm?.get('newStatus')?.value,
      comment: this.requestStatusUpdateForm?.get('comment')?.value,
    });
  }
}
