import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AuthService } from '@auth0/auth0-angular';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserState } from '../../store/user/user.state';
import { UserStateModel } from '../../../shared/models';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBarComponent {
  @Select(UserState.userState) userState$: Observable<UserStateModel>;

  constructor(private readonly authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}
