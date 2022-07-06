import { GrowDaySpan } from '../../enums'

export interface NewGrowDayPayload {
  date: string;
  goal: string;
  span: GrowDaySpan;
  createdById: string;
  creationDate: string;
  createdByName: string;
  lastModifiedOn?: string;
}
