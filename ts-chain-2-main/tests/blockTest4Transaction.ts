import Transaction from "../blockchain/Transaction";

const tx1 = new Transaction("HHH", "SSS", 100);
const tx2 = new Transaction("HHH", "SS2", 500);

console.log("Transaction 1:", tx1.toString());
console.log("Transaction 2:", tx2.toString());
