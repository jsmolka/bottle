export function format(value, decimals = 0) {
  return value.toLocaleString(undefined, {
    useGrouping: false,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}
