import Block from "../blockchain/Block";

const genesisBlock = new Block(0, new Date().toISOString(), [{ sender: "System", receiver: "jjj", amout: 100 }]);

console.log("Mining block...");
genesisBlock.mineBlock(2);
console.log("Mined Block:", genesisBlock);
