import Block from "../blockchain/Block";

const genesisBlock = new Block(0, new Date().toISOString(), [{ sender: "System", receiver: "JJJ", amount: 100 }]); //toISOString Date객체만 문자열로 저장, toString 모든 객체를 문자열로

console.log("Genesis Block:", genesisBlock);
