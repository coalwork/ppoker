export enum Rank {
  Two = 2,
  Three,
  Four,
  Five,
  Six,
  Seven,
  Eight,
  Nine,
  Ten,
  Jack,
  Queen,
  King,
  Ace
}

export enum Suit {
  Spades,
  Hearts,
  Clubs,
  Diamonds
}

export default class Card {
  rank: Rank;
  suit: Suit;

  constructor(rank: Rank, suit: Suit) {
    this.rank = rank;
    this.suit = suit;
    Object.freeze(this);
  }

  toString() {
    return `${Rank[this.rank]} of ${Suit[this.suit]}`;
  }
}

// const card = new Card(4, Suit.Diamonds);
// console.log(card.toString());
