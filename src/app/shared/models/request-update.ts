import { RequestUpdatePayload } from './payloads/request-update-payload';

export interface ResourceRequestUpdate extends RequestUpdatePayload {
  _id: string;
  updatedBy: string;
  updatedByName: string;
}
