import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput
    .split("\n")
    .map((line) => line.split("   ").map((num) => parseInt(num)));

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const left = [];
  const right = [];
  input.forEach((pair) => {
    left.push(pair[0]);
    right.push(pair[1]);
  });
  left.sort((a, b) => b - a);
  right.sort((a, b) => b - a);

  let total = 0;

  for (let i = 0; i < left.length; i++) {
    total += Math.abs(left[i] - right[i]);
  }

  // console.log(left, right);

  return total;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const rightMap = new Map();

  input.forEach((pair) => {
    rightMap.set(pair[1], rightMap.get(pair[1]) + 1 || 1);
  });

  let out = 0;

  // console.log(right, hashMap);
  for (let i = 0; i < input.length; i++) {
    const leftNum = input[i][0];
    const count = rightMap.get(leftNum) || 0;
    out += leftNum * count;
  }

  return out;
};

run({
  part1: {
    tests: [
      {
        input: `3   4
4   3
2   5
1   3
3   9
3   3`,
        expected: 11,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `3   4
4   3
2   5
1   3
3   9
3   3`,
        expected: 31,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
