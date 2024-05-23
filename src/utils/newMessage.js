export default function newMessage({ start, end, message, sender, ...data }) {
  let timeTaken;
  let formattedTime;

  console.log(message, sender, start, end)

  // If the sender is not the user, calculate the time taken.
  if (sender !== "user") {
    timeTaken = end - start;
    if (timeTaken > 1000) {
      formattedTime = `${(timeTaken / 1000).toFixed(2)}s`;
    } else {
      formattedTime = `${timeTaken.toFixed(2)}ms`;
    }
  }
  return {
    id: Math.random(),
    message: message,
    sender: sender ?? "user",
    timeTaken: timeTaken ?? "0ms",
    messageLength: message.length,
    formattedTime: formattedTime ?? "0ms",
    ...data,
  };
}
