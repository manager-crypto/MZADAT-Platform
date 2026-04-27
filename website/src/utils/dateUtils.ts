export const formatHijriDate = (date: Date | string | number): string => {
  const d = new Date(date);
  return new Intl.DateTimeFormat('ar-SA-u-ca-islamic', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    numberingSystem: 'latn',
  }).format(d);
};

export const formatGregorianDate = (date: Date | string | number, locale: string = 'ar-SA'): string => {
  const d = new Date(date);
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    calendar: 'gregory',
    numberingSystem: 'latn',
  }).format(d);
};

export const formatTime = (date: Date | string | number, locale: string = 'ar-SA'): string => {
  const d = new Date(date);
  return new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    numberingSystem: 'latn',
  }).format(d);
};

export const formatFullDateTime = (date: Date | string | number): { hijri: string, gregorian: string, time: string } => {
  const d = new Date(date);
  return {
    hijri: formatHijriDate(d),
    gregorian: formatGregorianDate(d),
    time: formatTime(d)
  };
};
