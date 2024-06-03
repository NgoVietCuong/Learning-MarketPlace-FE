export function secondsToMinutes(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}

export function secondsToHours(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.ceil((seconds % 3600) / 60);

  let result = '';

  if (hours > 0) {
    result += `${hours} hr `;
  }
  if (minutes > 0 || hours === 0) {
    result += `${minutes} min`;
  }

  return result.trim();
}