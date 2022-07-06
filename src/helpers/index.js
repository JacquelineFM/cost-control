/**
 * It returns a random string of numbers and letters, concatenated with the current time in
 * milliseconds
 * @returns A function that returns a string.
 */
export const getId = () => {
  const numRandom = Math.random().toString(36).substr(2);
  const date = Date.now().toString(36);

  return numRandom + date;
};

/**
 * It takes a date in the format of "2020-01-01" and returns a date in the format of "January 1, 2020".
 * @param date - The date to be formatted.
 * @returns A function that takes a date as an argument and returns a formatted date.
 */
export const formatDate = (date) => {
  const newDate = new Date(date);
  const options = { year: "numeric", month: "long", day: "2-digit" };

  return newDate.toLocaleDateString("us-US", options);
};
