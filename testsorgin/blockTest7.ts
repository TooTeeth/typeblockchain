import Blockchain from "../blockchain/Blockchain";
import Transaction from "../blockchain/Transaction";

const myBlockchain = new Blockchain();

const tx1 = new Transaction("GGe", "BAAb", 1020);
const tx2 = new Transaction("SSb", "CD", 530);

myBlockchain.addTransaction(tx1);
myBlockchain.addTransaction(tx2);

myBlockchain.minePendingTransactions("Miner1");

console.log("Balance of Miner:", myBlockchain.getBalanceOfAddress("Miner1"));
console.log("Balance of GGe:", myBlockchain.getBalanceOfAddress("GGe"));
console.log("Balance of CD:", myBlockchain.getBalanceOfAddress("CD"));
console.log("Balance of HH:", myBlockchain.getBalanceOfAddress("HH"));

console.log("Blockchain Data:");
console.log(JSON.stringify(myBlockchain, null, 2));
