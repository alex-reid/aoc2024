import run from "aocrunner";

function generatePageOrder(input) {
  const order = new Map();
  for (let index = 0; index < input.length; index++) {
    const pageGreaterThan = input[index][1];
    const pageLessThan = input[index][0];
    const lessThanCurrent = order.get(pageGreaterThan);
    if (!lessThanCurrent) order.set(pageGreaterThan, [pageLessThan]);
    else lessThanCurrent.push(pageLessThan);
  }
  return order;
}

const parseInput = (rawInput) =>
  rawInput.split("\n\n").map((v, i) => {
    return i == 0
      ? v.split("\n").map((v2) => v2.split("|").map((i) => parseInt(i)))
      : v.split("\n").map((v3) => v3.split(",").map((i2) => parseInt(i2)));
  });

const part1 = (rawInput) => {
  const [orderRules, pagesList] = parseInput(rawInput);
  const order = generatePageOrder(orderRules);

  let out = 0;
  pagesList.forEach((pages) => {
    let isOk = true;
    for (let i = 1; i < pages.length; i++) {
      if (order.get(pages[i - 1])?.includes(pages[i])) {
        isOk = false;
        break;
      }
    }
    if (isOk) {
      out += pages[Math.floor(pages.length / 2)];
    }
  });
  return out;
};

const part2 = (rawInput) => {
  const [orderRules, pagesList] = parseInput(rawInput);
  const order = generatePageOrder(orderRules);

  let out = 0;
  pagesList.forEach((pages) => {
    let isCorrectOrder = true;
    pages.sort((page, comparePage) => {
      if (order.get(page)?.includes(comparePage)) {
        return 0;
      } else {
        isCorrectOrder = false;
        return -1;
      }
    });
    if (!isCorrectOrder) {
      out += pages[Math.floor(pages.length / 2)];
    }
  });

  return out;
};

run({
  part1: {
    tests: [
      {
        input: `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`,
        expected: 143,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`,
        expected: 123,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
