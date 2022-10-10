let wires: number[] = [];
let gates: any[] = [];
function input() {
  let n = wires.length;
  wires.push(0);
  return n;
}
function nand(a, b) {
  let c = wires.length;
  wires.push(0);
  gates.push({ a, b, c });
  return c;
}
function simulate() {
  for (let g of gates) {
    let a = wires[g.a];
    let b = wires[g.b];
    wires[g.c] = ~(a & b) & 1;
  }
}
function test(s, a, b, c) {
  for (let u of [0, 1]) {
    for (let v of [0, 1]) {
      wires[a] = u;
      wires[b] = v;
      simulate();
      console.log(`${s}(${u},${v}) = ${wires[c]}`);
    }
  }
}
let a = input();
let b = input();
let c = nand(a, b);
test('NAND', a, b, c);
