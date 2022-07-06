import { RequestStatus } from '../../enums';

export interface RequestUpdatePayload {
  comment?: string;
  updatedOn?: string;
  resourceRequestId: string;
  updateType: RequestStatus;
}
