import { GrowDayStatus } from '../../enums'

export interface GrowDayStatusUpdatePayload {
  status: GrowDayStatus;
  lastModifiedOn: string;
}
