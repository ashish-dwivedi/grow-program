import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationPromptData } from '../../models';

@Component({
  selector: 'app-confirmation-prompt',
  templateUrl: './confirmation-prompt.component.html',
  styleUrls: ['./confirmation-prompt.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationPromptComponent {
  constructor(
    private readonly dialogRef: MatDialogRef<ConfirmationPromptComponent>,
    @Inject(MAT_DIALOG_DATA)
    public confirmationPromptData: ConfirmationPromptData
  ) {}

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
