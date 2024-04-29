import { EventEmitter } from 'node:events';

export interface FundTransferRecord {
  from: Account,
  to: Account,
  amount: number
}

export default class Account {
  #funds: number;
  emitter = new EventEmitter;

  constructor(startingAmount = 0) {
    this.#funds = startingAmount;
  }

  get funds() { return this.#funds; }
  set funds(amount: number) {
    const previousFunds = this.#funds;
    this.#funds = amount;
    this.emitter.emit('funds-changed', amount - previousFunds);
  }

  transferTo(account: Account, amount: number) {
    this.funds -= amount;
    account.funds += amount;

    const record: FundTransferRecord = {
      from: this,
      to: account,
      amount
    };
    this.emitter.emit('funds-transferred', record);
  }
}

// const account = new Account;
// account.emitter.on('funds-changed', (difference: number) => {
//   console.log(difference);
// });
// account.funds += 10;
// account.funds -= 5;

// const account1 = new Account;
// const account2 = new Account(50);
// account2.emitter.on('funds-transferred', (record: FundTransferRecord) => {
//   console.log(record);
//   console.log(account1.funds);
//   console.log(account2.funds);
// });
// 
// account2.transferTo(account1, 25);
