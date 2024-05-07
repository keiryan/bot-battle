function getStats(data) {
  const { start, end, message, assistant } = data;
  const timeTaken = end - start;
  return {
    timeTaken,
    messageLength: message.length,
    formattedTime:
      timeTaken > 1000
        ? `${(timeTaken / 1000).toFixed(2)}s`
        : `${timeTaken.toFixed(2)}ms`,
    ...data,
  };
}

export default getStats;
