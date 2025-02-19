import Wallet from "../wallet/Wallet";

export interface TransactionData {
  sender: string | null;
  receiver: string;
  amount: number;
  senderPublicKey: string | null;
  timestamp: string;
  signature: string | null;
}

class Transaction implements TransactionData {
  sender: string | null; //코인베이스를 null = 0주소로 설정, 다른 주소는 string
  receiver: string;
  amount: number;
  senderPublicKey: string | null;
  timestamp: string;
  signature: string | null = null;

  constructor(sender: string | null, receiver: string, amount: number, senderPublicKey: string | null = null, signature: string | null = null, timestamp: string = new Date().toISOString()) {
    this.sender = sender;
    this.receiver = receiver;
    this.amount = amount;
    this.senderPublicKey = senderPublicKey;
    this.signature = signature;
    this.timestamp = timestamp;
  }

  signTransaction(wallet: Wallet): void {
    if (wallet.address !== this.sender) {
      throw new Error("Transaction signing is only allowed by the sender.");
    }
    this.senderPublicKey = wallet.publicKey;
    const data = this.calculateHash();
    this.signature = wallet.signTransaction(data);
  }

  isValid(): boolean {
    if (this.sender === null) return true;
    if (!this.signature) {
      throw new Error("No signature in this transaction.");
    }
    if (!this.senderPublicKey) {
      throw new Error("No sender public key in this transaction.");
    }
    return Wallet.verifySignature(this.senderPublicKey, this.calculateHash(), this.signature);
  }

  calculateHash(): string {
    return JSON.stringify({
      sender: this.sender,
      senderPublicKey: this.senderPublicKey,
      receiver: this.receiver,
      amount: this.amount,
      timestamp: this.timestamp,
    });
  }

  static fromJSON(data: TransactionData): Transaction {
    return new Transaction(data.sender, data.receiver, data.amount, data.senderPublicKey, data.signature, data.timestamp);
  }
}

export default Transaction;
