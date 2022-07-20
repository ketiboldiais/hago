export function getLowestFraction(n: any) {
  let eps = 1.0e-8;
  let h: number,
    h1: number,
    h2: number,
    k: number,
    k1: number,
    k2: number,
    a: number,
    x: number;

  x = n;
  a = Math.floor(x);
  h1 = 1;
  k1 = 0;
  h = a;
  k = 1;

  while (x - a > eps * k * k) {
    x = 1 / (x - a);
    a = Math.floor(x);
    h2 = h1;
    h1 = h;
    k2 = k1;
    k1 = k;
    h = h2 + a * h1;
    k = k2 + a * k1;
  }

  return { numerator: h, denominator: k };
}
// return h + '/' + k;

// const n = 3.14;
// const m = GetLowestFraction(n);
