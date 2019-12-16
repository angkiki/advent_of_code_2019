import { phaseOffset, signalOffset } from '../_fft';

describe('phaseOffset()', () => {
  it('produces the correct phase', () => {
    const RES_1 = [0, 1, 0, -1, 0, 1, 0, -1];
    expect(phaseOffset(0, 7)).toEqual(RES_1);

    const RES_2 = [0, 0, 1, 1, 0, 0, -1, -1];
    expect(phaseOffset(1, 7)).toEqual(RES_2);

    const RES_3 = [0, 0, 0, 1, 1, 1, 0, 0, 0, -1];
    expect(phaseOffset(2, 9)).toEqual(RES_3);

    const RES_4 = [0, 0, 0, 1, 1, 1, 0, 0, 0, -1, -1, -1, 0];
    expect(phaseOffset(2, 12)).toEqual(RES_4);
  });
});

describe('signalOffset()', () => {
  it('offsets the input correctly', () => {
    const input = 12345678;
    const inputArr = input
      .toString()
      .split('')
      .map(n => +n);

    const result1 = signalOffset(inputArr);
    expect(+result1.join('')).toEqual(48226158);

    const result2 = signalOffset(result1);
    expect(+result2.join('')).toEqual(34040438);

    const result3 = signalOffset(result2);
    expect(result3.join('')).toEqual('03415518');
  });
});
