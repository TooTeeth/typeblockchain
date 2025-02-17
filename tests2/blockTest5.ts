import Block from "../blockchain/Block";
import Transaction from "../blockchain/Transaction";

const tx1 = new Transaction("Alice", "Bob", 100);
const tx2 = new Transaction("Bob", "Charlie", 50);

const block = new Block(1, [tx1, tx2], "0");

console.log("Mining block...");
block.mineBlock(3);

console.log("Mined Block:");
console.log(JSON.stringify(block, null, 2));
