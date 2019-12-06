import { parseInstruction } from "../advent";

describe("parseInstructions(instruction: number)", () => {
  it("- reads the last 2 digits as instructions and returns it as the opcode", () => {
    const i1 = 1002;
    const i2 = 102;
    const i3 = 99;

    expect(parseInstruction(i1).opCode).toEqual(2);
    expect(parseInstruction(i2).opCode).toEqual(2);
    expect(parseInstruction(i3).opCode).toEqual(99);
  });

  it("- returns a default of 0 for p1, p2, p3 if a value is not provided", () => {
    const i1 = 1002;
    const i2 = 102;
    const i3 = 99;

    expect(parseInstruction(i1).p2).toEqual(1);
    expect(parseInstruction(i2).p1).toEqual(1);
    expect(parseInstruction(i3).p2).toEqual(0);
  });
});
