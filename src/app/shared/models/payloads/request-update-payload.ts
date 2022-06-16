import { RequestUpdateType } from '../../enums';

export interface ResourceRequestUpdatePayload {
  comment?: string;
  updatedOn?: string;
  resourceRequestId: string;
  updateType: RequestUpdateType;
}
