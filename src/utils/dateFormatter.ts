export const dateFormatter = (
  date: Date | undefined
): { dateTimeAttribute: string; dateTimeValue: string } => {
  const formatter = new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const formattedDate = formatter.format(date);

  return {
    dateTimeAttribute: formattedDate.replace(/\//g, "-"),
    dateTimeValue: formattedDate,
  };
};
