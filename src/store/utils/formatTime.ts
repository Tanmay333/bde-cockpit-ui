export const formatTime = (dateString: string | null): string => {
  if (dateString === null) {
    return '--:--';
  }

  const dateObj = new Date(dateString);

  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();

  const hrsFormat = hours < 10 ? `0${hours}` : hours;
  const minFormat = minutes < 10 ? `0${minutes}` : minutes;

  const formattedTime = ` ${hrsFormat}:${minFormat}`;

  return formattedTime;
};
