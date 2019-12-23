import * as fs from 'fs';
import { parseInstructions, EInstructionTypes } from './_util';
import { Deck } from './_deck';

const STANDARD_DECK_LENGTH = 10007;

fs.readFile('./data.txt', 'utf-8', (err: Error, data: string) => {
  if (err) throw err;

  const dataArr = data.split('\n');
  const deck = new Deck(STANDARD_DECK_LENGTH);

  console.log('computing part one ....');
  dataArr.forEach(data => {
    const parsed = parseInstructions(data);
    switch (parsed.type) {
      case EInstructionTypes.DEAL_WITH:
        deck.dealWith(parsed.count);
        break;
      case EInstructionTypes.CUT:
        deck.cut(parsed.count);
        break;
      default:
        deck.dealNew();
    }
  });

  console.log('the answer for part one is : ', deck.cards.indexOf(2019));
});
