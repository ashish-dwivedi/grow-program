import { AppInitService } from '../../core/services/app-init/app-init.service';

export const initializeUserDetails = (appInitService: AppInitService) => {
  return (): Promise<void> => {
    return appInitService.initialize();
  };
};
