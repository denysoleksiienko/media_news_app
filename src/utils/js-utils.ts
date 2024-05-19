export function makeRandId(length: number) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getDateString(date: Date) {
  return `${date.getDate()} ${monthNames[date.getMonth()].slice(
    0,
    3
  )} ${date.getFullYear()}`;
}

export function getDateFromNow(date: Date) {
  const today = new Date();
  let minutes: string | number = date.getMinutes();
  let hours: string | number = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dateString = '';

  switch (true) {
    case today.getFullYear() - date.getFullYear() > 0:
      dateString = getDateString(date);
      break;
    case today.getMonth() - date.getMonth() > 0:
    case today.getMonth() - date.getMonth() === 0 &&
      today.getDate() - date.getDate() > 7:
      dateString = `${date.getDate()} ${monthNames[date.getMonth()].slice(
        0,
        3
      )}`;
      break;
    case today.getDate() - date.getDate() > 1:
      dateString = `${weekDays[date.getDay()]} ${hours}:${minutes}`;
      break;

    case today.getDate() - date.getDate() === 1:
      dateString = `yester ${hours}:${minutes}`;
      break;

    default:
      dateString = `today ${hours}:${minutes}`;
  }

  return dateString;
}

export function toDate(timeLike: any) {
  if (
    timeLike &&
    Object.keys(timeLike) &&
    Object.keys(timeLike).some((e) => e.includes('nanoseconds')) &&
    timeLike.toDate &&
    typeof timeLike.toDate === 'function'
  ) {
    return timeLike.toDate();
  }
  if (
    timeLike &&
    Object.keys(timeLike) &&
    Object.keys(timeLike).some((e) => e.includes('seconds'))
  ) {
    return new Date(timeLike.seconds);
  }
  if (
    timeLike &&
    (typeof timeLike === 'string' || typeof timeLike === 'number')
  ) {
    const date = new Date(timeLike);
    if (date && Number.isInteger(date.getMonth())) {
      return date;
    }
  }
  if (
    timeLike &&
    Object.prototype.toString.call(timeLike) === '[object Date]'
  ) {
    return timeLike;
  }
  return new Date();
}
