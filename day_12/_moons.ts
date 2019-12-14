export interface ICoords {
  x: number;
  y: number;
  z: number;
}

export class Moon {
  gravity: ICoords;
  velocity: ICoords;
  potentialEnergy: number;
  kineticEnergy: number;

  constructor(rawInput: string) {
    this.velocity = this.initVelocity();
    this.gravity = this.parseRawInput(rawInput);
    this.potentialEnergy = this.computePotentialEnergy();
    this.kineticEnergy = 0;
  }

  updateMoon = () => {
    this.updateGravity();
    this.updateEnergies();
  };

  // - - - - - - - - - - - - - - - - - - - -
  //            Private Methods
  // - - - - - - - - - - - - - - - - - - - -

  private updateGravity = () => {
    this.gravity.x += this.velocity.x;
    this.gravity.y += this.velocity.y;
    this.gravity.z += this.velocity.z;
  };

  private updateEnergies = () => {
    this.potentialEnergy = this.computePotentialEnergy();
    this.kineticEnergy = this.computeKineticEnergy();
  };

  private initVelocity = (): ICoords => ({ x: 0, y: 0, z: 0 });

  private parseRawInput = (rawInput: string): ICoords => {
    let newRaw = rawInput;
    newRaw = newRaw.replace('<', '');
    newRaw = newRaw.replace('>', '');

    const [x, y, z] = newRaw.split(', ');

    return {
      x: this.parseRawCoord(x),
      y: this.parseRawCoord(y),
      z: this.parseRawCoord(z),
    };
  };

  private parseRawCoord = (rawCoord: string): number => {
    return +rawCoord.split('=')[1];
  };

  private computePotentialEnergy = (): number => {
    const { x, y, z } = this.gravity;
    return Math.abs(x) + Math.abs(y) + Math.abs(z);
  };

  private computeKineticEnergy = (): number => {
    const { x, y, z } = this.velocity;
    return Math.abs(x) + Math.abs(y) + Math.abs(z);
  };
}
