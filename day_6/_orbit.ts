export class Orbit {
  parent: Orbit | null;
  children: Orbit[];
  directOrbits: number;
  indirectOrbits: number;

  constructor() {
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
