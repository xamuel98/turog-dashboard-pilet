/**
 * @description
 */

export const dateFilter = (date: string) => {
  const d = new Date(date);

  if (isNaN(d.getTime())) return date;

  return d
    .toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
    .replace(",", "");
};
