import Blockchain from "../blockchain/Blockchain";
import Block from "../blockchain/Block";

const myBlockchain = new Blockchain();

console.log("Create Genesis Block...");
console.log("Latest Block:", myBlockchain.getLatestBlock());

console.log("Adding new block...");
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

console.log("Blockchain Data:");
console.log(JSON.stringify(myBlockchain, null, 2));
