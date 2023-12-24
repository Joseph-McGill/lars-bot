const randomTimeInterval = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min) * 1000;
const wait = (n) => new Promise((resolve) => setTimeout(resolve, n));

export { randomTimeInterval, wait };
