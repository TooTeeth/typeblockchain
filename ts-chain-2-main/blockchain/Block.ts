import * as crypto from "crypto";
import Transaction from "./Transaction";

export interface BlockData {
  index: number;
  timestamp: string;
  transactions: Transaction[];
  previousHash: string;
  hash: string;
  nonce: number;
}

class Block implements BlockData {
  index: number;
  timestamp: string;
  transactions: Transaction[];
  previousHash: string;
  hash: string;
  nonce: number;

  constructor(index: number, transactions: Transaction[], previousHash: string = "", hash: string = "", nonce: number = 0, timestamp: string = new Date().toISOString()) {
    this.index = index;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.nonce = nonce;
    this.timestamp = timestamp;
    this.hash = hash;
  }

  calculateHash(): string {
    return crypto
      .createHash("sha256")
      .update(this.index + this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce)
      .digest("hex");
  }

  mineBlock(difficulty: number): void {
    const target = Array(difficulty + 1).join("0");

    while (!this.hash.startsWith(target)) {
      this.nonce++;
      this.hash = this.calculateHash();
    }

    console.log(`Block mined: ${this.hash}`);
  }
  static fromJSON(data: BlockData): Block {
    const transactions = data.transactions.map((tx: any) => Transaction.fromJSON(tx));

    return new Block(data.index, transactions, data.previousHash, data.hash, data.nonce, data.timestamp);
  }
}

export default Block;
