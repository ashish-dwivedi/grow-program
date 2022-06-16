import { ResourceType } from '../../enums';

export interface ResourceRequestPayload {
  resourceType: ResourceType;
  title: string;
  resourceDescription: string;
  resourceUrl: string;
  shippingAddress: string;
  justification?: string;
  estimatedCost?: number;
}
