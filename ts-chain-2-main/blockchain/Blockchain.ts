import Block from "./Block";
import Transaction from "./Transaction";

class Blockchain {
  chain: Block[];
  difficulty: number;
  transactionPool: Transaction[];
  miningReward: number;

  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 3;
    this.transactionPool = [];
    this.miningReward = 50;
  }

  private createGenesisBlock(): Block {
    return new Block(0, [], "");
  }

  getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  addTransaction(transaction: Transaction): void {
    this.transactionPool.push(transaction);
  }

  minePendingTransactions(minerAddress: string): void {
    const rewardTransaction = new Transaction(
      null,
      minerAddress,
      this.miningReward
    );
    this.transactionPool.push(rewardTransaction);

    const newBlock = new Block(
      this.chain.length,
      this.transactionPool,
      this.getLatestBlock().hash
    );

    console.log("Mining new block...");
    newBlock.mineBlock(this.difficulty);

    this.chain.push(newBlock);
    this.transactionPool = [];
  }

  getBalanceOfAddress(address: string): number {
    let balance = 0;

    for (const block of this.chain) {
      for (const transaction of block.transactions) {
        if (transaction.sender === address) balance -= transaction.amount;
        if (transaction.receiver === address) balance += transaction.amount;
      }
    }

    return balance;
  }

  isChainValid(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousHash = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        console.log(`Block ${currentBlock.index} has been tampered with.`);
        return false;
      }

      if (currentBlock.previousHash !== previousHash.hash) {
        console.log(
          `Blcok ${currentBlock.index} is not linked to the previous block.`
        );
        return false;
      }
    }

    return true;
  }
}

export default Blockchain;
