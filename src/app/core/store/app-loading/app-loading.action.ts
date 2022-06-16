import { UserDetails } from '../../../shared/models';

export class SetUserDetails {
  static readonly type = '[User] Set User Details';
  constructor(public payload: UserDetails) {}
}

export class FetchUpdatedUserDetails {
  static readonly type = '[User] Fetch Updated User Details';
  constructor(public payload?: string) {
  }
}
