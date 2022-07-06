import { Component } from '@angular/core';
import { Select } from '@ngxs/store'
import { Observable } from 'rxjs'
import { AppLoadingState } from './core/store/app-loading/app-loading.state'
import { MatDialog } from '@angular/material/dialog'
import { AddUserComponent } from './shared/components/add-user/add-user.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @Select(AppLoadingState.isAppLoading) isAppLoading$: Observable<boolean>;

  constructor(private readonly dialog: MatDialog) {
    this.dialog.open(AddUserComponent, {
      width: '50vw'
    })
  }
}
