import { ResourceType } from '../../enums';

export interface NewRequestPayload {
  resourceType: ResourceType;
  title: string;
  resourceDescription: string;
  resourceUrl: string;
  shippingAddress: string;
  justification?: string;
  estimatedCost?: number;
}
