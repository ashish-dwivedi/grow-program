import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipModule } from '@angular/material/tooltip';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';

import { PageHeaderComponent } from './components/page-header/page-header.component';
import { ResolveRolesDirective } from './directives/resolve-roles/resolve-roles.directive';
import { RequestTableComponent } from './components/request-table/request-table.component';
import { ConfirmationPromptComponent } from './components/confirmation-prompt/confirmation-prompt.component';
import { TransformToDisplayValuePipe } from './pipes/transform-to-display-value/transform-to-display-value.pipe';
import { RequestListFiltersComponent } from './components/request-list-filters/request-list-filters.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MessageBarComponent } from './components/message-bar/message-bar.component';
import { MatMenuModule } from '@angular/material/menu';
import { GrowDaysTableComponent } from './components/grow-days-table/grow-days-table.component';
import { UpdateGrowDayStatusDialogComponent } from '../grow-day-approval/update-grow-day-status-dialog/update-grow-day-status-dialog.component';
import { TransformSpanToDaysPipe } from './pipes/transform-span-to-days/transform-span-to-days.pipe';
import { AddUserComponent } from './components/add-user/add-user.component';

const MatModules = [
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule,
];

@NgModule({
  declarations: [
    TransformToDisplayValuePipe,
    RequestTableComponent,
    ResolveRolesDirective,
    ConfirmationPromptComponent,
    PageHeaderComponent,
    RequestListFiltersComponent,
    MessageBarComponent,
    GrowDaysTableComponent,
    UpdateGrowDayStatusDialogComponent,
    TransformSpanToDaysPipe,
    AddUserComponent,
  ],
  imports: [CommonModule, MatModules, ReactiveFormsModule],
  exports: [
    MatModules,
    ReactiveFormsModule,
    TransformToDisplayValuePipe,
    TransformSpanToDaysPipe,
    RequestTableComponent,
    ResolveRolesDirective,
    PageHeaderComponent,
    RequestListFiltersComponent,
    MessageBarComponent,
    GrowDaysTableComponent,
  ],
  providers: [
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: { position: 'above' } },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 5000 } },
  ],
})
export class SharedModule {}
