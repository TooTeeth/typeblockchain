import Transaction from "../blockchain/Transaction";

const tx1 = new Transaction("Alice", "Bob", 100);
const tx2 = new Transaction("Bob", "Charlie", 50);

console.log("Transaction 1:", tx1.toString());
console.log("Transaction 2:", tx2.toString());
