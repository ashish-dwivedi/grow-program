import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SharedModule } from '../shared/shared.module'
import { UserRoutingModule } from './user-routing.module'
import { UserOverviewComponent } from './user-overview/user-overview.component'
import { AllUsersComponent } from './all-users/all-users.component'

@NgModule({
  declarations: [UserOverviewComponent, AllUsersComponent],
  imports: [CommonModule, UserRoutingModule, SharedModule],
})
export class UserModule {}
