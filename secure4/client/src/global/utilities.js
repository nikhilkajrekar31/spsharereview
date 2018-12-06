function callCallbackIfExistsInObject(callback, object, ...args) {
  const c = object[callback];
  if (c) {
    c(...args);
  }
}

export {
  callCallbackIfExistsInObject,
};
