function formatMessage(message: string) {
  const regex = /(\d{4}-\d{2}-\d{2})\sàs\s(\d{2}:\d{2})/;

  const match = message.match(regex);
  if (!match) return message;

  const [_, date, time] = match;
  const dateObj = new Date(`${date}T${time}:00`);

  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(dateObj);

  return message.replace(regex, `${formattedDate} às ${time}`);
}

export default formatMessage;