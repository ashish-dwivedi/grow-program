import { User } from './user';
import { UserRole } from '../enums';

export interface UserDetails extends User {
  _id: string;
  frozenBudget: number;
  remainingBudget: number;
  growDays: number;
  roles: UserRole[];
}
