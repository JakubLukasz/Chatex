export const getCurrentDateTime = (): { dateTime: string; time: string } => {
  const today = new Date();
  const year = today.getFullYear();
  const month =
    today.getMonth() < 9 ? `0${today.getMonth() + 1}` : today.getMonth() + 1;
  const day = today.getDate();
  const date = `${year}-${month}-${day}`;
  const hours =
    today.getHours() < 10 ? `0${today.getHours()}` : today.getHours();
  const minutes =
    today.getMinutes() < 10 ? `0${today.getMinutes()}` : today.getMinutes();
  const secconds =
    today.getSeconds() < 10 ? `0${today.getSeconds()}` : today.getSeconds();
  const accurateTime = `${hours}:${minutes}:${secconds}`;
  const dateTime = `${date}' '${accurateTime}`;
  const time = `${hours}:${minutes}`;
  return { dateTime, time };
};
