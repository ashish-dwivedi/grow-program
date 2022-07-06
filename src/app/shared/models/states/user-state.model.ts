import { User } from '../user';

export interface UserStateModel extends User {
  frozenBudget: number;
  remainingBudget: number;
  growDays: number;
}
