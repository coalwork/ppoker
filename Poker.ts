import { EventEmitter } from 'node:events';
import Account from './Account';
import Player from './Player';

export interface PokerConfiguration {
  minPlayerCount: number;
  maxPlayerCount: number;
  smallBlind: number;
  bigBlind: number;
}

export default class Poker {
  emitter = new EventEmitter;
  pot = new Account;
  #activePlayers: Player[] = [];

  static minPlayerCount = 2;
  static maxPlayerCount = 8;
  static smallBlind = 2;
  static bigBlind = 4;

  async execute() {
    while (!this.isSufficientlyPopulated)
      await new Promise<void>(
        resolve => this.emitter.once('player-added', resolve));
  }

  get isSufficientlyPopulated() {
    return Poker.minPlayerCount <= this.#activePlayers.length && this.#activePlayers.length <= Poker.maxPlayerCount;
  }

  addPlayer(player: Player) {
    this.#activePlayers.push(player);
    this.emitter.emit('player-added', player);
  }

  removePlayer(player: Player) {
    const playerIndex = this.#activePlayers.findIndex(p => p === player);

    if (playerIndex < 0) return false;
    this.#activePlayers.splice(playerIndex, 1);
    this.emitter.emit('player-removed', player);
    return true;
  }

  static configure(config: PokerConfiguration) {
    Object.assign(config, Poker);
  }
}
