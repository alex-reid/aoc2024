import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput.split("\n").map((v) => v.split(" ").map((v2) => parseInt(v2)));

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let safeCount = input.length;

  // console.log(input);
  input.forEach((row) => {
    // console.log(row);
    const rowIncreasing = row[0] - row[1] < 0;

    for (let i = 0; i < row.length; i++) {
      const v1 = row[i];
      const v2 = row[i + 1];

      if (v2) {
        const diff = v1 - v2;
        const increasing = diff < 0;
        // console.log(v1, v2, v1 - v2, increasing, rowIncreasing);
        if (Math.abs(diff) > 3 || diff == 0 || increasing != rowIncreasing) {
          // console.log("unsafe", diff);
          safeCount--;
          break;
        }
      }
    }
  });
  // console.log(safeCount);

  return safeCount;
};

function isSafe(v2, v1, rowIncreasing) {
  const diff = v1 - v2;
  const increasing = diff < 0;
  // console.log(v1, v2, v1 - v2, increasing, rowIncreasing);
  if (Math.abs(diff) > 3 || diff == 0 || increasing != rowIncreasing) {
    return false;
  }
  return true;
}

function checkRowSafety(row) {
  // console.log(row);
  const rowIncreasing = row[0] - row[1] < 0;
  for (let i = 0; i < row.length; i++) {
    const v1 = row[i];
    const v2 = row[i + 1];
    if (v2) {
      const safe = isSafe(v2, v1, rowIncreasing);
      // console.log(v1, v2, safe);
      if (!safe) {
        return false;
      }
    }
  }
  return true;
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  let safeCount = input.length;

  input.forEach((row, index) => {
    // let rowErrors = 0;
    // console.log(index);

    // console.log("row1", rowSafe, row);
    if (!checkRowSafety(row)) {
      let rowGood = false;
      for (let j = 0; j < row.length; j++) {
        const newRow = [...row];
        newRow.splice(j, 1);
        // console.log(newRow);
        if (checkRowSafety(newRow)) {
          // console.log(newRow);
          rowGood = true;
          break;
        }
      }
      if (!rowGood) {
        safeCount--;
      }
    }
  });

  return safeCount;
};

run({
  part1: {
    tests: [
      {
        input: `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`,
        expected: 4,
      },
      {
        input: `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
1 2 3 4 9
9 1 2 3 4`,
        expected: 6,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
