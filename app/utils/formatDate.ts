export const formatDate = (isoDate: string | null) => {
  if (!isoDate) return "Data desconhecida";
  const date = new Date(isoDate);

  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
  });
};
