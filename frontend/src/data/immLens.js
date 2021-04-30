import * as R from 'ramda';

/**
 * Immutable variant of the lens function.
 * @param key
 */
export default key => {
  return R.lens(x => x.get(key), (val, x) => x.set(key, val));
};
