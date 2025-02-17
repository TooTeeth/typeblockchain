class Transaction {
  sender: string | null;
  receiver: string;
  amount: number;
  timestamp: string;

  constructor(sender: string | null, receiver: string, amount: number) {
    this.sender = sender;
    this.receiver = receiver;
    this.amount = amount;
    this.timestamp = new Date().toISOString();
  }

  toString(): string {
    return JSON.stringify(this);
  }
}

export default Transaction;
