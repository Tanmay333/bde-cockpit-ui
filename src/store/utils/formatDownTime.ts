export const formatDownTime = (dateString: string | null): string => {
  if (dateString === null) {
    return '--:--';
  }

  const dateObj = new Date(dateString);

  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const seconds = dateObj.getSeconds();

  const hrsFormat = hours < 10 ? `0${hours}` : hours;
  const minFormat = minutes < 10 ? `0${minutes}` : minutes;
  const secFormat = seconds < 10 ? `0${seconds}` : seconds;

  const formattedDownTime = ` ${hrsFormat}:${minFormat}:${secFormat}`;

  return formattedDownTime;
};

export const formatDownTimeDate = (timeString: string | null): string => {
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
