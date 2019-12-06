import * as fs from "fs";
import { Orbit, findTotalOrbits, findCommonParent } from "./_orbit";

interface IMemo {
  [key: string]: Orbit;
}

export interface ITraversalMemo {
  [key: string]: number | null;
}

interface IParsedInput {
  parent: string;
  child: string;
}

const ROOT = "COM";
const YOU = "YOU";
const SANTA = "SAN";

const parseInput = (input: string): IParsedInput => {
  const [parent, child] = input.split(")");
  return {
    parent,
    child,
  };
};

fs.readFile("./data.txt", "utf-8", (err: Error, data: string) => {
  const orbitsArray = data.split("\n");
  const memo: IMemo = {};
  let root: Orbit;

  console.log("computing part one ....");

  orbitsArray.forEach(orbit => {
    const { parent, child } = parseInput(orbit);
    let parentPlanet: Orbit;

    if (memo[parent]) {
      parentPlanet = memo[parent];
    } else {
      parentPlanet = new Orbit(parent);
      memo[parent] = parentPlanet;
    }

    if (memo[child]) {
      const childPlanet = memo[child];
      parentPlanet.addChild(childPlanet);
    } else {
      const childPlanet = new Orbit(child);
      parentPlanet.addChild(childPlanet);
      memo[child] = childPlanet;
    }

    if (parent === ROOT) {
      root = memo[parent];
    }
  });

  const totalOrbits = findTotalOrbits(root);
  console.log("total orbits -> ", totalOrbits);

  console.log("computing part two...");
  const you = memo[YOU];
  const santa = memo[SANTA];

  const start = you.parent;
  const target = santa.parent;

  const shortestPath = findCommonParent(start, target);
  console.log("shortest path ... ", shortestPath);
});
