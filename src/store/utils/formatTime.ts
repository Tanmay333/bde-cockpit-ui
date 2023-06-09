export const formatTime = (dateString: string | null): string => {
    if (dateString === null) {
        return 'N/A'
    }

    const dateObj = new Date(dateString);

    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const seconds = dateObj.getSeconds();

    const formattedTime = `${hours}:${minutes}:${seconds}`;

    return formattedTime;
};