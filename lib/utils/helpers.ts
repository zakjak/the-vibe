import moment from "moment";

export const calculateTime = (date: string) => {
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
    return past.format("Do MMMM YYYY");
  }
};

export const slugify = (username: string) => {
  return username.toLowerCase().trim().replace(/\s+/g, "-");
};
