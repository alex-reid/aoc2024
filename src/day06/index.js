import run from "aocrunner";

const parseInput = (rawInput) => {
  let sPos = [];
  return [
    rawInput.split("\n").map((v, y) =>
      v.split("").map((v2, x) => {
        if (v2 == "^") {
          sPos = [x, y];
          return false;
        }
        return v2 == "#";
      }),
    ),
    sPos,
  ];
};

const part1 = (rawInput) => {
  const [input, startPos] = parseInput(rawInput);
  console.log(startPos);
  const directions = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
  ];
  const boundsX = input[0].length;
  const boundsY = input.length;
  let turns = 0;

  const visited = new Array(boundsY)
    .fill("")
    .map((_v) => new Array(boundsX).fill(false));

  visited[startPos[1]][startPos[0]] = turns + 1;

  const inBounds = (x, y) => x >= 0 && y >= 0 && x < boundsX && y < boundsY;

  const getDirection = () => directions[turns % 4];

  const isObstacleInFront = (x, y) => {
    const [dirX, dirY] = getDirection();
    return input?.[y + dirY]?.[x + dirX];
  };

  let [xPos, yPos] = startPos;
  let steps = 1;
  // console.log(input, startPos, boundsX, boundsY);
  // console.log(steps, visited);

  while (inBounds(xPos, yPos)) {
    const [dirX, dirY] = getDirection();

    if (isObstacleInFront(xPos, yPos)) {
      turns++;
      continue;
    }

    xPos += dirX;
    yPos += dirY;

    if (!inBounds(xPos, yPos)) {
      break;
    }
    // console.log(xPos, yPos, visited[yPos][xPos], steps);

    if (!visited[yPos][xPos]) steps++;
    visited[yPos][xPos] = (turns % 4) + 1;
  }

  return steps;
};

/**
 * CURRENT SOLUTION:
 * walk the path and store into array
 * check each step on the path to see if a turn creates a loop.
 * WHY IT DOESN'T WORK
 * It doesn't factor in loops that are off the path I originally logged.
 *
 * SOLUTION
 * refactor this to test the new path at every step and see if the path ends up back at the starting point.
 * treat each iteration of the path walker as if it is a new starting point
 * ?? log each obstacle when hit ??
 * ?? keep current approach of only storing the path where a turn happens ??
 * - create a function to walk the path given a starting point and direction
 */
const part2 = (rawInput) => {
  const [input, startPos] = parseInput(rawInput);
  // console.log(startPos);
  const directions = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
  ];
  const boundsX = input[0].length;
  const boundsY = input.length;
  let turns = 0;
  let loops = 0;

  const visited = new Array(boundsY)
    .fill("")
    .map((_v) => new Array(boundsX).fill(false));

  // visited[startPos[1]][startPos[0]] = turns;

  const inBounds = (x, y) => x >= 0 && y >= 0 && x < boundsX && y < boundsY;

  const getDirection = (offset = 0) => directions[(turns + offset) % 4];

  const isObstacleInFront = (x, y, offset = 0) => {
    const [dirX, dirY] = getDirection(offset);
    return input?.[y + dirY]?.[x + dirX];
  };

  let [xPos, yPos] = startPos;
  let path = [{ x: xPos, y: yPos, dir: turns }];

  // console.log(input, startPos, boundsX, boundsY);
  // console.log(steps, visited);

  while (inBounds(xPos, yPos)) {
    const [dirX, dirY] = getDirection();

    if (isObstacleInFront(xPos, yPos)) {
      turns++;
      visited[yPos][xPos] = turns;
      continue;
    }

    // console.log(xPos, yPos);
    xPos += dirX;
    yPos += dirY;

    if (!inBounds(xPos, yPos)) {
      break;
    }
    path.push({ x: xPos, y: yPos, dir: turns });
  }

  [xPos, yPos] = startPos;
  // console.log(path, xPos, yPos);

  const scanForwards = (xStart, yStart, dir) => {
    let x = xStart;
    let y = yStart;
    const [dX, dY] = directions[(dir + 1) % 4];
    const [dXO, dYO] = directions[dir % 4];

    while (inBounds(x, y)) {
      x += dX;
      y += dY;
      const isObstacle = input?.[y + dY]?.[x + dX];
      if (
        inBounds(xStart + dXO, yStart + dYO) &&
        isObstacle &&
        visited[y][x] !== false &&
        dir > visited[y][x]
      ) {
        // console.log(
        //   "pos",
        //   xStart,
        //   yStart,
        //   "visited at ",
        //   x,
        //   y,
        //   dir > visited[y][x],
        //   xStart + dXO,
        //   yStart + dYO,
        // );
        loops++;
        break;
      }
    }
  };

  for (let i = 0; i < path.length; i++) {
    const { x, y, dir } = path[i];
    scanForwards(x, y, dir);
  }

  // printMaze(visited, input);

  return loops;
};

run({
  part1: {
    tests: [
      {
        input: `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...
`,
        expected: 41,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      //       {
      //         input: `....#.....
      // .........#
      // ..........
      // ..#.......
      // .......#..
      // ..........
      // .#..^.....
      // ........#.
      // #.........
      // ......#...
      // `,
      //         expected: 6,
      //       },
      //       {
      //         input: `.#..
      // ..#.
      // .^..`,
      //         expected: 6,
      //       },
      //       {
      //         input: `##..
      // ...#
      // ....
      // ^.#.
      // `,
      //         expected: 0,
      //       },
      {
        input: `.#...
      ....#
      .....
      .^.#.
      #....
      ..#..`,
        expected: 3,
      },
    ],

    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
function printMaze(visited, input) {
  const dirs = ["^ ", "> ", "v ", "< "];
  console.log(
    // visited,
    visited.reduce(
      (a, c, y) =>
        a +
        c.reduce((a2, c2, x) => {
          if (x == 0) a2 += y + " ";
          if (input[y][x]) return a2 + "# ";
          return a2 + (c2 === false ? ". " : dirs[c2 % 4]);
        }, "") +
        "\n",
      "  0 1 2 3 4 5 6 7 8 9\n",
    ),
  );
}
