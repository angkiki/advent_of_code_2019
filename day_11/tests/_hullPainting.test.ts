import { EDirection, turnLeft, turnRight, IHullMap, ICoordinates, traverseHull } from '../_hullPainting';

describe('Direction Testing', () => {
  let startingDir: EDirection;

  beforeEach(() => {
    startingDir = EDirection.UP;
  });

  it('turns right correctly', () => {
    startingDir = turnRight(startingDir);
    expect(startingDir).toEqual(EDirection.RIGHT);

    startingDir = turnRight(startingDir);
    expect(startingDir).toEqual(EDirection.DOWN);

    startingDir = turnRight(startingDir);
    expect(startingDir).toEqual(EDirection.LEFT);

    startingDir = turnRight(startingDir);
    expect(startingDir).toEqual(EDirection.UP);
  });

  it('turns left correctly', () => {
    startingDir = turnLeft(startingDir);
    expect(startingDir).toEqual(EDirection.LEFT);

    startingDir = turnLeft(startingDir);
    expect(startingDir).toEqual(EDirection.DOWN);

    startingDir = turnLeft(startingDir);
    expect(startingDir).toEqual(EDirection.RIGHT);

    startingDir = turnLeft(startingDir);
    expect(startingDir).toEqual(EDirection.UP);
  });
});

describe('Map Traversal', () => {
  let initMap: IHullMap[][];
  let coords: ICoordinates;

  beforeEach(() => {
    initMap = [[{ color: 0, visited: false }]];
    coords = { col: 0, row: 0 };
  });

  it('traverses up correctly, and prepends row correctly', () => {
    const dir = EDirection.UP;
    traverseHull(initMap, dir, coords);

    expect(coords).toMatchObject({ col: 0, row: 0 });
    expect(initMap.length).toEqual(2);
    expect(initMap[0][0]).toMatchObject(initMap[1][0]);
  });

  it('traverses down correctly, and appends row correctly', () => {
    const dir = EDirection.DOWN;
    traverseHull(initMap, dir, coords);

    expect(coords).toMatchObject({ col: 0, row: 1 });
    expect(initMap.length).toEqual(2);
    expect(initMap[0][0]).toMatchObject(initMap[1][0]);
  });

  it('traverses right correctly, and appends col correctly', () => {
    const dir = EDirection.RIGHT;
    traverseHull(initMap, dir, coords);

    expect(coords).toMatchObject({ col: 1, row: 0 });
    expect(initMap.length).toEqual(1);
    expect(initMap[0].length).toEqual(2);
    expect(initMap[0][0]).toMatchObject(initMap[0][1]);
  });

  it('traverses left correctly, and prepends col correctly', () => {
    const dir = EDirection.LEFT;
    traverseHull(initMap, dir, coords);

    expect(coords).toMatchObject({ col: 0, row: 0 });
    expect(initMap.length).toEqual(1);
    expect(initMap[0].length).toEqual(2);
    expect(initMap[0][0]).toMatchObject(initMap[0][1]);
  });

  it('traverses multiple directions & extends the map correctly', () => {
    let dir = EDirection.UP;
    traverseHull(initMap, dir, coords);

    expect(coords).toMatchObject({ col: 0, row: 0 });
    expect(initMap.length).toEqual(2);
    expect(initMap[0].length).toEqual(1);
    expect(initMap[0][0]).toMatchObject(initMap[1][0]);

    dir = EDirection.RIGHT;
    traverseHull(initMap, dir, coords);

    expect(coords).toMatchObject({ col: 1, row: 0 });
    expect(initMap.length).toEqual(2);
    expect(initMap[0].length).toEqual(2);
    expect(initMap[0][0]).toMatchObject(initMap[1][0]);
    expect(initMap[0][0]).toMatchObject(initMap[1][1]);

    dir = EDirection.LEFT;
    traverseHull(initMap, dir, coords);

    expect(coords).toMatchObject({ col: 0, row: 0 });
    expect(initMap.length).toEqual(2);
    expect(initMap[0].length).toEqual(2);
    expect(initMap[0][0]).toMatchObject(initMap[1][0]);
    expect(initMap[0][0]).toMatchObject(initMap[1][1]);

    dir = EDirection.DOWN;
    traverseHull(initMap, dir, coords);

    expect(coords).toMatchObject({ col: 0, row: 1 });
    expect(initMap.length).toEqual(2);
    expect(initMap[0].length).toEqual(2);
    expect(initMap[0][0]).toMatchObject(initMap[1][0]);
    expect(initMap[0][0]).toMatchObject(initMap[1][1]);
  });
});
