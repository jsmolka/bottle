import { merge } from 'lodash-es';

export function format(value, options = {}) {
  options = merge(
    {
      minDigits: 0,
      maxDigits: 0,
    },
    options,
  );

  return value.toLocaleString(undefined, {
    useGrouping: false,
    minimumFractionDigits: options.minDigits,
    maximumFractionDigits: options.maxDigits,
  });
}
