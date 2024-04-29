import Card from './Card';

export default class Deck {
  cards: Card[];

  constructor(cards: Card[] = []) {
    this.cards = [...cards];
  }

  shuffle() {
    for (let i = 0; i < this.cards.length; i++) {
      const j = Math.floor(Math.random() * this.cards.length);
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  static get default() {
    const cards: Card[] = [];
    for (let i = 0; i < 52; i++) {
      cards.push(new Card(i % 13 + 2, Math.floor(i / 13)));
    }
    return new Deck(cards);
  }
}

// const deck = Deck.default;
// deck.shuffle();
// for (let card of deck.cards)
//   console.log(card.toString());
