const formatElapsed = elapsed => {
  const time = new Date(elapsed);
  const mins = padString(time.getUTCMinutes().toString(), 2, "0");
  const secs = padString(time.getUTCSeconds().toString(), 2, "0");
  const milli = padString(time.getUTCMilliseconds().toString(), 3, "0");
  return `${mins}:${secs}:${milli}`;
};

const padString = (str, padTo, pad) =>
  pad.repeat(str.length >= padTo ? 0 : padTo - str.length) + str;

export default {
  formatElapsed
};
