function getStats(data) {
  const { start, end, message, assistant } = data;
  const timeTaken = end - start;
  console.log(
    `API call completed in ${timeTaken.toFixed(
      2
    )}ms ${timeTaken > 1000 && '(' + (timeTaken / 1000).toFixed(2).toString() + 's)'} - ${assistant}. Message was ${message.length} characters long.`
  ); // Log the time taken
};

export default getStats;
