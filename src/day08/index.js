import run from "aocrunner";

const parseInput = (rawInput) => {
  const positions = new Map();
  const raw = rawInput.split("\n").map((v, y) =>
    v
      .trim()
      .split("")
      .map((v2, x) => {
        if (v2 !== ".") {
          if (!positions.has(v2)) {
            positions.set(v2, [[x, y]]);
          } else {
            positions.get(v2).push([x, y]);
          }
        }
        return v2;
      }),
  );
  const width = raw[0].length;
  const height = raw.length;

  return [raw, positions, width, height];
};

const part1 = (rawInput) => {
  const [, positions, width, height] = parseInput(rawInput);
  const inBounds = ([x, y]) => x >= 0 && y >= 0 && x < width && y < height;
  const antMap = new Set();
  positions.forEach((freq) => {
    for (let a1 = 0; a1 < freq.length; a1++) {
      const ant1 = freq[a1];
      for (let a2 = a1 + 1; a2 < freq.length; a2++) {
        const ant2 = freq[a2];
        const dist = [ant2[0] - ant1[0], ant2[1] - ant1[1]];
        const node1 = [ant1[0] - dist[0], ant1[1] - dist[1]];
        const node2 = [ant2[0] + dist[0], ant2[1] + dist[1]];
        if (inBounds(node1)) {
          antMap.add(node1.join(":"));
        }
        if (inBounds(node2)) {
          antMap.add(node2.join(":"));
        }
      }
    }
  });

  return antMap.size;
};

const part2 = (rawInput) => {
  const [, positions, width, height] = parseInput(rawInput);
  const inBounds = ([x, y]) => x >= 0 && y >= 0 && x < width && y < height;
  const antMap = new Set();
  positions.forEach((freq) => {
    for (let a1 = 0; a1 < freq.length; a1++) {
      const ant1 = freq[a1];
      for (let a2 = a1 + 1; a2 < freq.length; a2++) {
        const ant2 = freq[a2];
        const dist = [ant2[0] - ant1[0], ant2[1] - ant1[1]];
        let node1 = [ant1[0] - dist[0], ant1[1] - dist[1]];
        let node2 = [ant2[0] + dist[0], ant2[1] + dist[1]];
        antMap.add(ant1.join(":"));
        antMap.add(ant2.join(":"));
        while (inBounds(node1)) {
          antMap.add(node1.join(":"));
          node1 = [node1[0] - dist[0], node1[1] - dist[1]];
        }
        while (inBounds(node2)) {
          antMap.add(node2.join(":"));
          node2 = [node2[0] + dist[0], node2[1] + dist[1]];
        }
      }
    }
  });
  return antMap.size;
};

run({
  part1: {
    tests: [
      {
        input: `............
                ........0...
                .....0......
                .......0....
                ....0.......
                ......A.....
                ............
                ............
                ........A...
                .........A..
                ............
                ............`,
        expected: 14,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `............
                ........0...
                .....0......
                .......0....
                ....0.......
                ......A.....
                ............
                ............
                ........A...
                .........A..
                ............
                ............`,
        expected: 34,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
