export class Orbit {
  parent: Orbit | null;
  directOrbits: number;
  indirectOrbits: number;

  constructor(parent: Orbit | null) {
    this.parent = parent;
    this.directOrbits = parent ? 1 : 0;
    this.indirectOrbits = parent
      ? parent.directOrbits + parent.indirectOrbits
      : 0;
  }
}
