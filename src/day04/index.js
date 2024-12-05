import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n").map((v) => v.split(""));

const checkXmas = (v) => v == "XMAS" || v == "SAMX";

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let totalMatches = 0;

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[0].length; x++) {
      if (x < input[0].length - 3) {
        const horizontal =
          input[y][x] + input[y][x + 1] + input[y][x + 2] + input[y][x + 3];
        if (checkXmas(horizontal)) totalMatches++;
      }
      if (y < input.length - 3) {
        const vertical =
          input[y][x] + input[y + 1][x] + input[y + 2][x] + input[y + 3][x];
        if (checkXmas(vertical)) totalMatches++;
      }
      if (y < input.length - 3 && x < input[0].length - 3) {
        const diagPos =
          input[y][x] +
          input[y + 1][x + 1] +
          input[y + 2][x + 2] +
          input[y + 3][x + 3];
        const diagNeg =
          input[y][x + 3] +
          input[y + 1][x + 2] +
          input[y + 2][x + 1] +
          input[y + 3][x];
        if (checkXmas(diagPos)) totalMatches++;
        if (checkXmas(diagNeg)) totalMatches++;
      }
    }
  }
  return totalMatches;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const PATTERNS = ["MMSS", "SSMM", "MSMS", "SMSM"];

  let totalMatches = 0;
  for (let y = 1; y < input.length - 1; y++) {
    for (let x = 1; x < input[0].length - 1; x++) {
      if (input[y][x] === "A") {
        const tl = input[y - 1][x - 1];
        const tr = input[y - 1][x + 1];
        const bl = input[y + 1][x - 1];
        const br = input[y + 1][x + 1];
        if (PATTERNS.includes(tl + tr + bl + br)) {
          totalMatches++;
        }
      }
    }
  }
  return totalMatches;
};

run({
  part1: {
    tests: [
      {
        input: `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`,
        expected: 18,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`,
        expected: 9,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
