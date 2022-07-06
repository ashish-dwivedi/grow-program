import { ResourceType } from '../enums';

export const getIconForRequestType = (resourceType: ResourceType = ResourceType.Book): string => {
  switch (resourceType) {
    case ResourceType.Book: {
      return 'book';
    }
    case ResourceType.Course: {
      return 'live_tv';
    }
    case ResourceType.Conference: {
      return 'groups_2';
    }
    case ResourceType.Journal: {
      return 'auto_stories';
    }
    case ResourceType.Magazine: {
      return 'menu_book';
    }
    default: {
      return 'book';
    }
  }
};
