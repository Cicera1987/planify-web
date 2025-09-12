export const formatHours = (time: string) => {
  const [hours, minutes] = time.split(":");
  return `${hours}:${minutes}`;
};
