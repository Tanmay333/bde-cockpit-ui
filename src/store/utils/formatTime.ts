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

export const formatDate = (timeString: string | null): string => {
  if (timeString === null) {
    return '--:--';
  }

  const date = new Date(timeString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${day}.${month}.${year} ${hours}:${minutes}`;
};