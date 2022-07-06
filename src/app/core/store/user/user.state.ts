import { Injectable } from '@angular/core';

import { Action, Selector, State, StateContext } from '@ngxs/store';

import { FetchUpdatedUserDetails, SetUserDetails } from './user.action';
import { UserDetails, UserStateModel } from '../../../shared/models';
import { UserService } from '../../services/user/user.service';

@State<UserStateModel>({
  name: 'user',
  defaults: {
    _id: '',
    remainingBudget: 0,
    frozenBudget: 0,
    growDays: 0,
    email: '',
    email_verified: false,
    family_name: '',
    given_name: '',
    locale: '',
    name: '',
    nickname: '',
    picture: '',
    sub: '',
    updated_at: '',
  },
})
@Injectable()
export class UserState {
  constructor(private readonly userService: UserService) {}

  @Selector()
  static userState(state: UserStateModel) {
    return state;
  }

  @Selector()
  static userId(state: UserStateModel) {
    return state._id;
  }

  @Selector()
  static userName(state: UserStateModel) {
    return state.name;
  }

  @Selector()
  static remainingBudget(state: UserStateModel) {
    return state.remainingBudget;
  }

  @Action(SetUserDetails)
  setUserGrowDetails(
    { getState, setState }: StateContext<UserStateModel>,
    { payload }: SetUserDetails
  ): void {
    setState({ ...getState(), ...payload });
  }

  @Action(FetchUpdatedUserDetails)
  fetchUpdatedUserDetails({
    getState,
    setState,
  }: StateContext<UserStateModel>, { payload }: FetchUpdatedUserDetails): void {
    this.userService
      .getUserDetailsBySubjectId(payload || getState()?.sub)
      .subscribe((userDetails: UserDetails) => {
        setState({ ...getState(), ...userDetails });
      });
  }
}
