export function Normalize(
  enteredValue: number,
  minEntry = -10_000,
  maxEntry = 10_000,
  normalizedMin = -1000,
  normalizedMax = 1000
) {
  var mx = (enteredValue - minEntry) / (maxEntry - minEntry);
  var preshiftNormalized = mx * (normalizedMax - normalizedMin);
  var shiftedNormalized = preshiftNormalized + normalizedMin;

  return shiftedNormalized;
}
