import { Moon } from '../_moons';
import { computeVelocity, simluateTick } from '../_ticks';

describe('computeVelocity()', () => {
  it('- derives the new velocity and gravity correctly (1)', () => {
    const m1 = new Moon('<x=10, y=18, z=-12>');
    const m2 = new Moon('<x=-6, y=15, z=-7>');

    computeVelocity(m1, m2);
    expect(m1.velocity).toMatchObject({ x: -1, y: -1, z: 1 });
    expect(m2.velocity).toMatchObject({ x: 1, y: 1, z: -1 });

    m1.updateMoon();
    m2.updateMoon();

    expect(m1.gravity).toMatchObject({ x: 9, y: 17, z: -11 });
    expect(m2.gravity).toMatchObject({ x: -5, y: 16, z: -8 });
  });

  it('- derives the new velocity and gravity correctly (2)', () => {
    const m1 = new Moon('<x=-1, y=0, z=2>');
    const m2 = new Moon('<x=2, y=-10, z=-7>');

    computeVelocity(m1, m2);
    expect(m1.velocity).toMatchObject({ x: 1, y: -1, z: -1 });
    expect(m2.velocity).toMatchObject({ x: -1, y: 1, z: 1 });

    m1.updateMoon();
    m2.updateMoon();

    expect(m1.gravity).toMatchObject({ x: 0, y: -1, z: 1 });
    expect(m2.gravity).toMatchObject({ x: 1, y: -9, z: -6 });
  });
});

describe('simulateTick()', () => {
  const m1 = new Moon('<x=-1, y=0, z=2>');
  const m2 = new Moon('<x=2, y=-10, z=-7>');
  const m3 = new Moon('<x=4, y=-8, z=8>');
  const m4 = new Moon('<x=3, y=5, z=-1>');
  const moons = [m1, m2, m3, m4];

  it('- simulates tick 1 correctly', () => {
    simluateTick(moons);

    expect(m1.gravity).toMatchObject({ x: 2, y: -1, z: 1 });
    expect(m1.velocity).toMatchObject({ x: 3, y: -1, z: -1 });

    expect(m2.gravity).toMatchObject({ x: 3, y: -7, z: -4 });
    expect(m2.velocity).toMatchObject({ x: 1, y: 3, z: 3 });

    expect(m3.gravity).toMatchObject({ x: 1, y: -7, z: 5 });
    expect(m3.velocity).toMatchObject({ x: -3, y: 1, z: -3 });

    expect(m4.gravity).toMatchObject({ x: 2, y: 2, z: 0 });
    expect(m4.velocity).toMatchObject({ x: -1, y: -3, z: 1 });
  });

  it('- simulates tick 2 correctly', () => {
    simluateTick(moons);

    expect(m1.gravity).toMatchObject({ x: 5, y: -3, z: -1 });
    expect(m1.velocity).toMatchObject({ x: 3, y: -2, z: -2 });

    expect(m2.gravity).toMatchObject({ x: 1, y: -2, z: 2 });
    expect(m2.velocity).toMatchObject({ x: -2, y: 5, z: 6 });

    expect(m3.gravity).toMatchObject({ x: 1, y: -4, z: -1 });
    expect(m3.velocity).toMatchObject({ x: 0, y: 3, z: -6 });

    expect(m4.gravity).toMatchObject({ x: 1, y: -4, z: 2 });
    expect(m4.velocity).toMatchObject({ x: -1, y: -6, z: 2 });
  });

  it('- simluates ticks 3 - 10 correctly', () => {
    for (let i = 3; i <= 10; i++) {
      simluateTick(moons);
    }

    const totalEnergy = moons.reduce((acc: number, curr: Moon) => {
      return acc + curr.kineticEnergy * curr.potentialEnergy;
    }, 0);

    expect(totalEnergy).toEqual(179);
  });
});

describe('simulateTick() - test 2', () => {
  const m1 = new Moon('<x=-8, y=-10, z=0>');
  const m2 = new Moon('<x=5, y=5, z=10>');
  const m3 = new Moon('<x=2, y=-7, z=3>');
  const m4 = new Moon('<x=9, y=-8, z=-3>');
  const moons = [m1, m2, m3, m4];

  it('- simulates 100 ticks correctly', () => {
    for (let i = 1; i <= 100; i++) {
      simluateTick(moons);
    }

    const totalEnergy = moons.reduce((acc: number, curr: Moon) => {
      return acc + curr.kineticEnergy * curr.potentialEnergy;
    }, 0);

    expect(totalEnergy).toEqual(1940);
  });
});
