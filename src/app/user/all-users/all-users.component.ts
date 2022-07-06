import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import { ConfirmationPromptData, UserDetails } from '../../shared/models';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationPromptComponent } from '../../shared/components/confirmation-prompt/confirmation-prompt.component';
import { INITIAL_USER_BUDGET } from '../../shared/constants';
import { filter, finalize, Observable, switchMap } from 'rxjs'
import { UserService } from '../../core/services/user/user.service';
import { MatTable } from '@angular/material/table';
import { StartAppLoading, StopAppLoading } from '../../core/store/app-loading/app-loading.action';
import { Select, Store } from '@ngxs/store'
import { UserState } from '../../core/store/user/user.state'

@Component({
  selector: 'app-budget-overview',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllUsersComponent implements OnInit {
  allUsers: UserDetails[];
  initialUserBudget = INITIAL_USER_BUDGET;
  displayedColumns = ['name', 'role', 'growDays', 'remainingBudget', 'frozenBudget', 'action'];

  @ViewChild(MatTable) table: MatTable<UserDetails>;

  @Select(UserState.userId) userId$: Observable<string>;

  constructor(
    private readonly store: Store,
    private readonly dialog: MatDialog,
    private readonly userService: UserService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.allUsers = this.activatedRoute.snapshot.data['allUsers'];
  }

  onResetBudgetClick(user: UserDetails): void {
    const dialog = this.dialog.open(ConfirmationPromptComponent, {
      width: '25vw',
      data: {
        heading: 'Reset Budget',
        message: `Are you sure you want to reset the budget for <strong>${user?.name}</strong> to <strong>${INITIAL_USER_BUDGET} €</strong>?`,
        confirmButtonText: 'Confirm',
        dismissButtonText: 'Dismiss',
        confirmButtonColor: 'primary',
      } as ConfirmationPromptData,
    });
    dialog
      .afterClosed()
      .pipe(
        filter((closedOnConfirmation) => !!closedOnConfirmation),
        switchMap(() => {
          this.store.dispatch(new StartAppLoading());
          return this.userService.resetBudget(user?._id);
        }),
        finalize(() => this.store.dispatch(new StopAppLoading()))
      )
      .subscribe((userDetails: UserDetails) => {
        const index = this.allUsers.findIndex(
          (userItem: UserDetails) => user?._id === userItem?._id
        );
        if (index >= 0) {
          this.allUsers.splice(index, 1, userDetails);
        }
        this.table.renderRows();
      });
  }

  onDeleteUserClick(user: UserDetails): void {
    const dialog = this.dialog.open(ConfirmationPromptComponent, {
      width: '25vw',
      data: {
        heading: 'Delete User',
        message: `Are you sure you want to delete the user <strong>${user?.name}</strong>?`,
        confirmButtonText: 'Confirm',
        dismissButtonText: 'Dismiss',
        confirmButtonColor: 'warn',
      } as ConfirmationPromptData,
    });
    dialog
      .afterClosed()
      .pipe(
        filter((closedOnConfirmation) => !!closedOnConfirmation),
        switchMap(() => this.userService.deleteUser(user?._id))
      ).subscribe(() => {
        const index = this.allUsers.findIndex(userItem => userItem?._id === user?._id);
        if (index >= 0) {
          this.allUsers.splice(index, 1);
          this.table.renderRows();
          this.changeDetectorRef.markForCheck();
        }
    })
  }
}
