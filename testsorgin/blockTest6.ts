import Blockchain from "../blockchain/Blockchain";
import Transaction from "../blockchain/Transaction";

const myBlockchain = new Blockchain();

const tx1 = new Transaction("GGe", "BAAb", 1020);
const tx2 = new Transaction("SSb", "CD", 530);

myBlockchain.addBlock([tx1, tx2]);

console.log("Is blockchain valid?", myBlockchain.isChainValid());

console.log("Blockchain Data:");
console.log(JSON.stringify(myBlockchain, null, 2));
