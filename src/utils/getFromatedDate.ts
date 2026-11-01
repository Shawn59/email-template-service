import { DateTime } from 'luxon';

export const getDateLocalUtc = (dateIso: string, format = 'HH:mm:ss') => {
  try {
    const localDateTime = DateTime.fromISO(dateIso).setLocale('ru').toLocal();

    return localDateTime.toFormat(format);
  } catch (e) {
    return '';
  }
};
