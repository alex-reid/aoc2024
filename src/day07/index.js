import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput.split("\n").map((v) => {
    const parts = v.split(": ");
    return {
      solution: parseInt(parts[0]),
      inputs: parts[1].split(" ").map((v2) => parseInt(v2)),
    };
  });

const trySolutions = (input, sol) => {
  if (input.length == 2) {
    if (input[0] + input[1] == sol) return true;
    if (input[0] * input[1] == sol) return true;
  } else if (input.length > 2) {
    const n1 = input.shift();
    const n2 = input.shift();
    if (trySolutions([n1 + n2, ...input], sol)) return true;
    if (trySolutions([n1 * n2, ...input], sol)) return true;
  }
  return false;
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let out = 0;
  input.forEach(({ solution, inputs }) => {
    if (trySolutions(inputs, solution)) out += solution;
  });
  return out;
};

const trySolutionsPart2 = (input, sol) => {
  if (input.length == 2) {
    if (input[0] + input[1] == sol) return true;
    if (input[0] * input[1] == sol) return true;
    if (parseInt("" + input[0] + input[1]) == sol) return true;
  } else if (input.length > 2) {
    const n1 = input.shift();
    const n2 = input.shift();
    if (trySolutionsPart2([n1 + n2, ...input], sol)) return true;
    if (trySolutionsPart2([n1 * n2, ...input], sol)) return true;
    if (trySolutionsPart2([parseInt("" + n1 + n2), ...input], sol)) return true;
  }
  return false;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  let out = 0;
  input.forEach(({ solution, inputs }) => {
    if (trySolutionsPart2(inputs, solution)) out += solution;
  });
  return out;
};

run({
  part1: {
    tests: [
      {
        input: `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`,
        expected: 3749,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`,
        expected: 11387,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
