import Blockchain from "../blockchain/Blockchain";
import Block from "../blockchain/Block";

const myBlockchain = new Blockchain();

console.log("Initial chain validity:", myBlockchain.isChainValid());

myBlockchain.addBlock(
  new Block(1, new Date().toISOString(), [
    {
      sender: "Alice",
      receiver: "Bob",
      amount: 50,
    },
  ])
);
myBlockchain.addBlock(
  new Block(2, new Date().toISOString(), [
    {
      sender: "Bob",
      receiver: "Charlie",
      amount: 30,
    },
  ])
);

console.log("Chain after adding blocks:");
console.log(JSON.stringify(myBlockchain, null, 2));
console.log("Chain validity after adding blocks:", myBlockchain.isChainValid());

myBlockchain.chain[1].transactions = [
  { sender: "Eve", receiver: "Mallory", amount: 100 },
];
console.log("Chain validity after tampering:", myBlockchain.isChainValid());
