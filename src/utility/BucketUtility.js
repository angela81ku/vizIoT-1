export const getBucketKey = (bucketUnit, bucketSize, bucketObjects) => {
  return `${bucketUnit}${bucketSize}${bucketObjects.join()}`
}
