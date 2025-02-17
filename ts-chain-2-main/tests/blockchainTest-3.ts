import Blockchain from "../blockchain/Blockchain";
import Transaction from "../blockchain/Transaction";

const myBlockchain = new Blockchain();

const tx1 = new Transaction("Alice", "Bob", 100);
const tx2 = new Transaction("Bob", "Charlie", 50);

myBlockchain.addBlock([tx1, tx2]);

console.log("Is blockchain valid?", myBlockchain.isChainValid());

console.log("Blockchain Data:");
console.log(JSON.stringify(myBlockchain, null, 2));
