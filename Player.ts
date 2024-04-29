import { EventEmitter } from 'node:events';
import Account from './Account';
import Deck from './Deck';

export default class Player {
  account: Account;
  emitter = new EventEmitter;
  hand: Deck = new Deck;

  constructor(startingFunds = 0) {
    this.account = new Account(startingFunds);
  }

  dealHand(hand: Deck) {
    this.hand = hand;
  }
}
