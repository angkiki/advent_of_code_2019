import { Deck } from '../_deck';

describe('Testing Deck Class', () => {
  let deck: Deck;

  beforeEach(() => {
    deck = new Deck(10);
  });

  it('- deals new correctly', () => {
    const expected = Array(10)
      .fill(null)
      .map((_, i) => i)
      .reverse();
    deck.dealNew();
    expect(deck.cards).toEqual(expected);
  });

  it('- cuts front correctly', () => {
    const expected = [3, 4, 5, 6, 7, 8, 9, 0, 1, 2];
    deck.cut(3);
    expect(deck.cards).toEqual(expected);
  });

  it('- cuts back correctly', () => {
    const expected = [6, 7, 8, 9, 0, 1, 2, 3, 4, 5];
    deck.cut(-4);
    expect(deck.cards).toEqual(expected);
  });

  it('- deals with correctly', () => {
    const expected = [0, 7, 4, 1, 8, 5, 2, 9, 6, 3];
    deck.dealWith(3);
    expect(deck.cards).toEqual(expected);
  });

  it('- performs a sequence correctly', () => {
    const expected = [0, 3, 6, 9, 2, 5, 8, 1, 4, 7];
    deck.dealWith(7);
    deck.dealNew();
    deck.dealNew();
    expect(deck.cards).toEqual(expected);
  });

  it('- performs a sequence correctly', () => {
    const expected = [3, 0, 7, 4, 1, 8, 5, 2, 9, 6];
    deck.cut(6);
    deck.dealWith(7);
    deck.dealNew();
    expect(deck.cards).toEqual(expected);
  });

  it('- performs a sequence correctly', () => {
    const expected = [9, 2, 5, 8, 1, 4, 7, 0, 3, 6];
    deck.dealNew();
    deck.cut(-2);
    deck.dealWith(7);
    deck.cut(8);
    deck.cut(-4);
    deck.dealWith(7);
    deck.cut(3);
    deck.dealWith(9);
    deck.dealWith(3);
    deck.cut(-1);
    expect(deck.cards).toEqual(expected);
  });
});
