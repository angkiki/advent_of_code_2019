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

    droid.move(EDir.DOWN);

    const e3 = [
      [{ value: ERepairGrid.WALL, visited: true }],
      [{ value: ERepairGrid.PATH, visited: true }],
      [{ value: null, visited: true }],
    ];
    const c3 = { col: 0, row: 2 };
    expect(droid.grid).toEqual(e3);
    expect(droid.currCoords).toMatchObject(c3);

    droid.markCurrentAsPath();

    const e4 = [
      [{ value: ERepairGrid.WALL, visited: true }],
      [{ value: ERepairGrid.PATH, visited: true }],
      [{ value: ERepairGrid.PATH, visited: true }],
    ];
    expect(droid.grid).toEqual(e4);
  });
});
