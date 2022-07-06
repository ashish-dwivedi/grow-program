import * as moment from 'moment';

import { GrowDay } from '../models';
import { GrowDaySpan, GrowDayStatus } from '../enums';

export const getMonthsRemainingSpan = (
  allUserBookings: GrowDay[],
  monthToCheck: number
): GrowDaySpan | undefined => {
  const monthBookings = allUserBookings.filter(
    (growDay: GrowDay) =>
      growDay.status !== GrowDayStatus.Rejected &&
      moment().set('month', monthToCheck).isSame(moment(growDay?.date), 'month')
  );
  const halfDayEntries = monthBookings.filter(
    (monthEntry: GrowDay) => monthEntry.span === GrowDaySpan.HalfDay
  );
  if (
    monthBookings.some((monthEntry: GrowDay) => monthEntry.span === GrowDaySpan.FullDay) ||
    halfDayEntries?.length === 2
  ) {
    return undefined;
  } else if (halfDayEntries?.length === 1) {
    return GrowDaySpan.HalfDay;
  } else {
    return GrowDaySpan.FullDay;
  }
};
