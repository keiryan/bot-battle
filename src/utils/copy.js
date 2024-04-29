function copy(message) {
  navigator.clipboard.writeText(message);
  console.log("copy", message);
}

export default copy;
