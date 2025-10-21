import moment from "moment";

export const calculateTime = (date: Date) => {
  const now = moment();
  const then = moment(date, "YYYY-MM-DD HH:mm:ss.SSSSSS");

  const diff = now.diff(then);
  const duration = moment.duration(diff);

  if (duration.asSeconds() < 60) {
    return `${Math.floor(duration.asSeconds())} seconds ago`;
  } else if (duration.asMinutes() < 60) {
    return `${Math.floor(duration.asMinutes())} minutes ago`;
  } else if (duration.asHours() < 24) {
    return `${Math.floor(duration.asHours())} hours ago`;
  } else if (duration.asDays() < 30) {
    return `${Math.floor(duration.asDays())} days ago`;
  } else {
    return then.format("D MMM YYYY");
  }
};

export const nameFallback = (name: string) => {
  const nameArray = name?.split(" ");
  return nameArray[0]?.slice(0, 1) + nameArray[1]?.slice(0, 1);
};

export const slugify = (username: string) => {
  return username.toLowerCase().trim().replace(/\s+/g, "-");
};

// PAGINATION
export function getPaginationRange(
  current: number,
  totalPages: number,
  delta: number = 1
) {
  const range: (number | string)[] = [];
  const left = Math.max(2, current - delta);
  const right = Math.min(totalPages - 1, current + delta);

  range.push(1);

  if (left > 2) {
    range.push("...");
  } else if (left === 2) {
    range.push(2);
  }

  for (let i = left; i <= right; i++) {
    range.push(i);
  }

  if (right < totalPages - 1) {
    range.push("...");
  } else if (right === totalPages - 1) {
    range.push(totalPages - 1);
  }

  if (totalPages > 1) {
    range.push(totalPages);
  }

  return Array.from(new Set(range));
}
