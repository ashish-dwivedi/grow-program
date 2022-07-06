import { AppRoutes, UserRole } from '../enums';

export const roleRouteMapping = {
  [UserRole.Admin]: [
    AppRoutes.Dashboard,
    AppRoutes.Request,
    AppRoutes.History,
    AppRoutes.User,
    AppRoutes.Budget,
    AppRoutes.RequestApproval,
    AppRoutes.DayApproval,

  ],
  [UserRole.Approver]: [
    AppRoutes.Dashboard,
    AppRoutes.Request,
    AppRoutes.History,
    AppRoutes.User,
    AppRoutes.Budget,
    AppRoutes.RequestApproval,
    AppRoutes.DayApproval,
  ],
  [UserRole.Employee]: [
    AppRoutes.Dashboard,
    AppRoutes.Request,
    AppRoutes.History,
    AppRoutes.User,
  ],
};
