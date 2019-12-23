export class Deck {
  cards: number[];

  constructor(deckLength: number) {
    this.cards = this.newDeck(deckLength);
  }

  dealNew = () => {
    this.cards.reverse();
  };

  cut = (count: number) => {
    count >= 0 ? (this.cards = this.cutFront(count)) : (this.cards = this.cutBack(Math.abs(count)));
  };

  dealWith = (increment: number) => {
    const newCards = Array(this.cards.length).fill(null);
    let pointer = 0;

    for (let i = 0; i < this.cards.length; i++) {
      newCards[pointer] = this.cards[i];
      pointer = this.addPointer(pointer, increment);
    }

    this.cards = newCards;
  };

  private addPointer = (p: number, i: number): number => {
    p += i;

    if (p > this.cards.length) {
      p -= this.cards.length;
    }

    return p;
  };

  private cutFront = (count: number) => {
    const firstHalf = this.cards.slice(0, count);
    const secondHalf = this.cards.slice(count, this.cards.length);
    return [...secondHalf, ...firstHalf];
  };

  private cutBack = (count: number) => {
    const firstHalf = this.cards.slice(0, this.cards.length - count);
    const secondHalf = this.cards.slice(this.cards.length - count, this.cards.length);
    return [...secondHalf, ...firstHalf];
  };

  private newDeck = (deckLength: number): number[] =>
    Array(deckLength)
      .fill(null)
      .map((_, index) => index);
}
