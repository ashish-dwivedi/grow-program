import { UserGrowDetails } from '../../shared/models';

export class SetUserGrowDetails {
  static readonly type = '[User] Set User Grow Details';
  constructor(public payload: UserGrowDetails) {}
}
