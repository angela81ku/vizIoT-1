export const fetcherFactory = (fetcher, collector, delay = 1000) => {
  // resource requires all three values, if any one is not defined throw an error
  if (!fetcher) {
    throw new Error('fetcher resource cannot be null');
  }
  if (!collector) {
    throw new Error('collector resource cannot be null');
  }

  return {
    fetcher,
    delay,
    collector,
  }
}