const formatHours = (time: string) => {
  if (!time) return "";
  const [hours = "", minutes = ""] = time.split(":");
  const h = hours.padStart(2, "0").slice(0, 2);
  const m = minutes.padStart(2, "0").slice(0, 2);
  return `${h}:${m}`;
};

const formatTime = (time: string) => {
  return time.split(":").slice(0, 2).join(":");
};

const isValidTime = (value: string) => {
  return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
};

const formatTimeInput = (value: string) => {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 0) return "";
  if (digits.length <= 2) return digits;
  return digits.slice(0, 2) + ":" + digits.slice(2, 4);
};

export { formatHours, formatTime, isValidTime, formatTimeInput };
