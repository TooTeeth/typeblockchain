import Blockchain from "../blockchain/Blockchain";
import Transaction from "../blockchain/Transaction";

const myBlockchain = new Blockchain();

const tx1 = new Transaction("Alice", "Bob", 100);
const tx2 = new Transaction("Bob", "Charlie", 50);

myBlockchain.addTransaction(tx1);
myBlockchain.addTransaction(tx2);

myBlockchain.minePendingTransactions("Miner1");

console.log("Balance of Miner1:", myBlockchain.getBalanceOfAddress("Miner1"));
console.log("Balance of Alice:", myBlockchain.getBalanceOfAddress("Alice"));
console.log("Balance of Bob:", myBlockchain.getBalanceOfAddress("Bob"));
console.log("Balance of Charlie:", myBlockchain.getBalanceOfAddress("Charlie"));

console.log("Blockchain Data:");
console.log(JSON.stringify(myBlockchain, null, 2));
