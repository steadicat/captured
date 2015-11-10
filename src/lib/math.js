export function linear(start, startValue, end, endValue, x) {
  return startValue + (x - start) / (end - start) * (endValue - startValue);
}
