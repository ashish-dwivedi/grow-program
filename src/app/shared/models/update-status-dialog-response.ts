import { RequestStatus } from '../enums';

export interface UpdateStatusDialogResponse {
  status: RequestStatus;
  comment?: string;
}
