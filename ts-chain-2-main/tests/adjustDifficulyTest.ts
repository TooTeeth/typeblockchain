import Blockchain from "../blockchain/Blockchain";
import Transaction from "../blockchain/Transaction";
import Wallet from "../wallet/Wallet";

const blockchain = new Blockchain();

const aliceWallet = new Wallet();
const bobWallet = new Wallet();

blockchain.minePendingTransactions(aliceWallet.address);
console.log(blockchain.difficulty);

for (let i = 0; i < 4; i++) {
  const tx = new Transaction(aliceWallet.address, bobWallet.address, 25);
  tx.signTransaction(aliceWallet);
  blockchain.addTransaction(tx);

  blockchain.minePendingTransactions(aliceWallet.address);
  console.log(blockchain.difficulty);
}

console.log("Balance of Alice:", blockchain.getBalanceOfAddress(aliceWallet.address));
console.log("Balance of Bob:", blockchain.getBalanceOfAddress(bobWallet.address));
