import { RequestUpdatePayload } from './payloads/request-update-payload';

export interface RequestUpdate extends RequestUpdatePayload {
  _id: string;
  updatedById: string;
  updatedByName: string;
}
