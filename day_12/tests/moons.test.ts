import { Moon } from '../_moons';

describe('Moon Class', () => {
  const sampleInput = '<x=-6, y=15, z=-7>';

  it('- initialises the Moon correctly', () => {
    const moon = new Moon(sampleInput);

    expect(moon.gravity.x).toEqual(-6);
    expect(moon.gravity.y).toEqual(15);
    expect(moon.gravity.z).toEqual(-7);

    expect(moon.velocity.x).toEqual(0);
    expect(moon.velocity.y).toEqual(0);
    expect(moon.velocity.z).toEqual(0);

    expect(moon.potentialEnergy).toEqual(28);
    expect(moon.kineticEnergy).toEqual(0);
  });
});
