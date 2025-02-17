class Transaction {
  sender: string;
  receiver: string;
  amount: number;
  timestamp: string;

  constructor(sender: string, receiver: string, amount: number) {
    this.sender = sender;
    this.receiver = receiver;
    this.amount = amount;
    this.timestamp = new Date().toISOString();
  }

  toString(): string {
    return JSON.stringify(this);
  } //override 해서 새로 만든 toString이라고 생각하면 된다.
}

export default Transaction;
