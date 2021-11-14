import { formatDistance } from "date-fns";

export const humanizeIsoDate = (isoDateString: string) =>
  formatDistance(new Date(isoDateString), new Date(), { addSuffix: true });
