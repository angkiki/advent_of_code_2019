export class Orbit {
  parent: Orbit | null;
  children: Orbit[];
  directOrbits: number;
  indirectOrbits: number;

  constructor(parent: Orbit | null) {
    this.parent = parent;
    this.children = [];
    this.directOrbits = parent ? 1 : 0;
    this.indirectOrbits = parent
      ? parent.directOrbits + parent.indirectOrbits
      : 0;
  }

  addParent(parent: Orbit) {
    this.directOrbits = 1;
    this.indirectOrbits = parent.directOrbits + parent.indirectOrbits;
  }

  addChild(child: Orbit) {
    this.children.push(child);
  }
}
