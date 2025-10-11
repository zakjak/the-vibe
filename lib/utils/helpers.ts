import moment from "moment";

export const calculateTime = (date: Date) => {
  const now = moment();
  const past = moment(date);

  const diffMinutes = now.diff(past, "minutes");
  const diffHours = now.diff(past, "hours");

  if (diffHours < 24) {
    if (diffHours >= 1) {
      return `${diffHours} hours ago`;
    } else {
      return `${diffMinutes} minutes ago`;
    }
  } else {
    return past.format("ll");
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
