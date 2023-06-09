export const formatTime = (dateString: string | null): string => {
  if (dateString === null) {
    return 'N/A';
  }

  const dateObj = new Date(dateString);

  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();

  const formattedTime = `${hours}:${minutes}`;

  return formattedTime;
};
