import { Injectable } from '@angular/core';

import { Action, Selector, State, StateContext } from '@ngxs/store';

import { SetUserGrowDetails } from './user.action';
import { UserStateModel } from '../../shared/models';

@State<UserStateModel>({
  name: 'animals',
  defaults: {
    remainingBudget: 0,
    frozenBudget: 0,
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
  @Selector()
  static userState(state: UserStateModel) {
    return state;
  }

  @Selector()
  static remainingBudget(state: UserStateModel) {
    return state.remainingBudget;
  }

  @Action(SetUserGrowDetails)
  setUserGrowDetails(
    { getState, setState }: StateContext<UserStateModel>,
    { payload }: SetUserGrowDetails
  ): void {
    setState({ ...getState(), ...payload });
  }
}
