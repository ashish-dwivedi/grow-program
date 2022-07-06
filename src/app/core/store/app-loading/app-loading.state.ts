import { Injectable } from '@angular/core';

import { Action, Selector, State, StateContext } from '@ngxs/store';

import { AppLoadingStateModel } from '../../../shared/models';
import { StartAppLoading, StopAppLoading } from './app-loading.action';

@State<AppLoadingStateModel>({
  name: 'loading',
  defaults: {
    isAppLoading: false,
  },
})
@Injectable()
export class AppLoadingState {
  @Selector()
  static isAppLoading(state: AppLoadingStateModel) {
    return state.isAppLoading;
  }

  @Action(StartAppLoading)
  startAppLoading({ setState }: StateContext<AppLoadingStateModel>): void {
    setState({ isAppLoading: true });
  }

  @Action(StopAppLoading)
  stopAppLoading({ setState }: StateContext<AppLoadingStateModel>): void {
    setState({ isAppLoading: false });
  }
}
