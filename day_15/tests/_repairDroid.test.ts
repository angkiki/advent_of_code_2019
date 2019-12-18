import { RepairDroid, EDir, ERepairGrid } from '../_repairDroid';

describe('RepairDroid', () => {
  it('works correctly', () => {
    const droid = new RepairDroid();
    droid.move(EDir.UP);

    const e = [[{ value: null, visited: true }], [{ value: ERepairGrid.PATH, visited: true }]];
    const c = { col: 0, row: 0 };
    expect(droid.currCoords).toMatchObject(c);
    expect(droid.grid).toEqual(e);

    droid.markCurrentAsWall();

    const e2 = [[{ value: ERepairGrid.WALL, visited: true }], [{ value: ERepairGrid.PATH, visited: true }]];
    const c2 = { col: 0, row: 1 };
    expect(droid.grid).toEqual(e2);
    expect(droid.currCoords).toMatchObject(c2);
  });
});
