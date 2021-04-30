'use es6';

export const createMockCall = (mockedResponse, timeout = 2000) => {
  return new Promise((resolve) => {
    let delayedAction = setTimeout(() => {
      clearTimeout(delayedAction);
      resolve(mockedResponse);
    }, timeout)
  });
};
