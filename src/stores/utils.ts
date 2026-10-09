export const formatTime = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);

  const period = hours >= 12 ? "PM" : "AM";

  const formattedHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;

  return `${formattedHours}:${String(minutes).padStart(2, "0")} ${period}`;
};

export const getInitials = (name: string) => {
  return name
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};