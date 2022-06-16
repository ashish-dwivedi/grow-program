import { RequestStatus, ResourceType } from '../enums';

export interface ResourceRequest {
  _id: string;
  title: string;
  resourceType: ResourceType;
  resourceDescription: string;
  resourceUrl: string;
  shippingAddress: string;
  justification?: string;
  estimatedCost?: number;
  creationDate: string;
  createdById: string;
  createdByName: string;
  lastModifiedOn: string;
  requestStatus: RequestStatus;
}
