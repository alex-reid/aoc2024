import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");

const part1 = (rawInput) => {
  const input = parseInput(rawInput).join("");
  const matches = input.matchAll(/mul\((\d+),(\d+)\)/gm);
  let out = 0;
  for (let match of matches) {
    out += match[1] * match[2];
  }

  return out;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput).join("");
  const strings = input.split("don't()").map((dont) => dont.split("do()"));
  const safeString = strings
    .map((string, index) => {
      if (index == 0) {
        return string.join();
      } else {
        string.shift();
        return string.join();
      }
    })
    .join("");

  // console.log(safeString);

  const matches = safeString.matchAll(/mul\((\d+),(\d+)\)/gm);

  let out = 0;
  for (let match of matches) {
    // console.log(match[0]);
    out += match[1] * match[2];
  }

  return out;
};

run({
  part1: {
    tests: [
      {
        input: `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`,
        expected: 161,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `xdo()mul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`,
        expected: 48,
      },
      {
        input: `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))
xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undon't()?mul(8,5))
xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`,
        expected: 104,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
