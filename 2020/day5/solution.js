const fs = require("fs");
let data = fs.readFileSync("./data.txt", "utf-8").split("\n");

const avg = (min, max) => (min + max) / 2;

const dict = {
  F: (min, max, ...rest) => [min, Math.floor(avg(min, max)), ...rest],
  B: (min, max, ...rest) => [Math.ceil(avg(min, max)), max, ...rest],
  R: (_, __, ...rest) => [_, __, ...dict.B(...rest)],
  L: (_, __, ...rest) => [_, __, ...dict.F(...rest)],
};

function analyze(seq) {
  let s = seq.split("");
  let min = 0;
  let max = 127;
  let minRow = 0;
  let maxRow = 7;
  let [row, _, seat, __] = s.reduce(
    (acc, val) => {
      let next = dict[val](...acc);
      return next;
    },
    [min, max, minRow, maxRow]
  );
  return row * 8 + seat;
}

data = data.map(analyze);

data.sort((a, b) => a - b);

console.log(data[data.length - 1]);
