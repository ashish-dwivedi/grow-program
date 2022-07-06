import { NewGrowDayPayload } from './payloads/new-grow-day-payload';
import { GrowDayStatus } from '../enums'

export interface GrowDay extends NewGrowDayPayload {
  _id: string;
  status: GrowDayStatus;
}
