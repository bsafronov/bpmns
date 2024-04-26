import { formatRelative } from "date-fns";
import { ru } from "date-fns/locale";

export const getRelativeDate = (date: Date) => {
  return formatRelative(date, new Date(), { locale: ru });
};
