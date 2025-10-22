const formatDate = (isoDate: string | null) => {
  if (!isoDate) return "Data desconhecida";
  const date = new Date(isoDate);

  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
  });
};
const formatFullDate = (
  day: number,
  month: string,
  year = new Date().getFullYear(),
) => {
  const months: Record<string, number> = {
    jan: 0,
    fev: 1,
    mar: 2,
    abr: 3,
    mai: 4,
    jun: 5,
    jul: 6,
    ago: 7,
    set: 8,
    out: 9,
    nov: 10,
    dez: 11,
  };
  const monthKey = month.toLowerCase().replace(".", "");
  const monthIndex = months[monthKey];
  if (monthIndex === undefined) return new Date();
  return new Date(year, monthIndex, day);
};

const formatDisplayDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export { formatDate, formatFullDate, formatDisplayDate };
