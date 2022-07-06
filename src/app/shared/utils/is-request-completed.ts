import { RequestStatus } from '../enums';

export const isRequestCompleted = (requestStatus: RequestStatus): boolean =>
  [
    RequestStatus.Approved,
    RequestStatus.Completed,
    RequestStatus.Rejected,
  ].includes(requestStatus);
