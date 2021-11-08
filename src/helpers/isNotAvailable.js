export default function isNotAvailable(event, eventStart, eventEnd) {
  let existingStart = parseInt(event.strt.replace(":", ""));
  let existingEnd = parseInt(event.ending.replace(":", ""));
  let newStart = parseInt(eventStart.replace(":", ""));
  let newEnd = parseInt(eventEnd.replace(":", ""));

  let startBetweenStartEnd = existingStart <= newStart && existingEnd > newStart;
  let startEarlyEndBetweenStartEnd =
    existingStart > newStart && existingEnd >= newEnd && newEnd >= existingStart;
  let startEarlyEndAfterStartEnd =
    existingStart > newStart && existingEnd <= newEnd && newEnd >= existingStart;
  console.log(startBetweenStartEnd);
  console.log(startEarlyEndBetweenStartEnd);
  console.log(startEarlyEndAfterStartEnd);
  return (
    startBetweenStartEnd ||
    startEarlyEndBetweenStartEnd ||
    startEarlyEndAfterStartEnd
  );
}
