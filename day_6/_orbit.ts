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

  addParent(parent: Orbit) {
    if (this.parent !== null) {
      throw Error("This orbit already has a parent");
    }

    this.parent = parent;
    this.directOrbits = 1;
    this.indirectOrbits = parent.directOrbits + parent.indirectOrbits;
  }

  addChild(child: Orbit) {
    this.children.push(child);
    this.reconcileChildOrbits(child);
  }

  private reconcileChildOrbits(child: Orbit) {
    child.parent = this;
    child.directOrbits = 1;
    child.indirectOrbits = this.directOrbits + this.indirectOrbits;

    child.children.forEach(c => this.reconcileChildOrbits(c));
  }
}

export const findTotalOrbits = (orbit: Orbit): number => {
  if (orbit.children.length === 0) {
    return orbit.directOrbits + orbit.indirectOrbits;
  }

  return (
    orbit.directOrbits +
    orbit.indirectOrbits +
    orbit.children.reduce((acc, curr) => acc + findTotalOrbits(curr), 0)
  );
};
