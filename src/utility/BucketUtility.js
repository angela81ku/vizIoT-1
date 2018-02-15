export const getBucketKey = (bucketUnit, bucketSize, bucketProps) => {
  return `${bucketUnit}${bucketSize}${bucketProps.join()}`;
};

export const getBucketKeyWithConfig = bucketConfig => {
  const { bucketUnit, bucketSize, bucketProps } = bucketConfig;
  return getBucketKey(bucketUnit, bucketSize, bucketProps);
};
