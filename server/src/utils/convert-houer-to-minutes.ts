export const convertHoursToMinutes = (hours: string) => {
  const [hour, minutes] = hours.split(':').map(Number);
  const hoursAsMinutes = hour * 60;

  return hoursAsMinutes + minutes;
};
