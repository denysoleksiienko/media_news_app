/* eslint-disable */

// export function sortBy(key, cb) {
//   if (!cb) cb = () => 0;
//   return (a, b) => (a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : cb(a, b));
// }

// export function sortByDesc(key, cb) {
//   if (!cb) cb = () => 0;
//   return (b, a) => (a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : cb(b, a));
// }

// export function orderBy(keys, orders) {
//   let cb = () => 0;
//   keys.reverse();
//   orders.reverse();
//   for (const [i, key] of keys.entries()) {
//     const order = orders[i];
//     if (order == 'asc') cb = sortBy(key, cb);
//     else if (order == 'desc') cb = sortByDesc(key, cb);
//     else throw new Error(`Unsupported order "${order}"`);
//   }
//   return cb;
// }

export function makeRandId(length) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function getDateFromNow(date) {
  const today = new Date();
  let minutes = date.getMinutes();
  let hours = date.getHours();
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

export function toDate(timeLike) {
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
