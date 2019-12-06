export class Orbit {
  name: string;
  parent: Orbit | null;
  children: Orbit[];
  directOrbits: number;
  indirectOrbits: number;

  constructor(name: string) {
    this.name = name;
    this.parent = null;
    this.children = [];
    this.directOrbits = 0;
    this.indirectOrbits = 0;
  }

  addChild(child: Orbit) {
    this.children.push(child);
    this.reconcileChildOrbits(child);
  }

  private reconcileChildOrbits(child: Orbit) {
    child.parent = this;
    child.directOrbits = 1;
    child.indirectOrbits = this.directOrbits + this.indirectOrbits;

    child.children.forEach(c => child.reconcileChildOrbits(c));
  }
}

export const findTotalOrbits = (orbit: Orbit): number =>
  orbit.directOrbits +
  orbit.indirectOrbits +
  orbit.children.reduce((acc, curr) => acc + findTotalOrbits(curr), 0);

export const findCommonParent = (start: Orbit, target: Orbit): number => {
  const startArray = [];
  const targetArray = [];

  let currStart = start;
  let currTarget = target;

  while (true) {
    currStart = currStart.parent ? currStart.parent : currStart;
    currTarget = currTarget.parent ? currTarget.parent : currTarget;

    targetArray.push(currTarget.name);
    startArray.push(currStart.name);

    if (startArray.includes(currTarget.name)) {
      let index = startArray.indexOf(currTarget.name);
      startArray.splice(index + 1);
      break;
    }

    if (targetArray.includes(currStart.name)) {
      let index = targetArray.indexOf(currStart.name);
      targetArray.splice(index + 1);
      break;
    }

    if (!currStart.parent && !currTarget.parent) {
      break;
    }
  }

  return startArray.length + targetArray.length;
};
