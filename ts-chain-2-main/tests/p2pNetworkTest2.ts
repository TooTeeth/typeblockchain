import Blockchain from "../blockchain/Blockchain";
import Transaction from "../blockchain/Transaction";
import P2PNetwork from "../network/P2PNetwork";

const blockchain1 = new Blockchain();
const network1 = new P2PNetwork(blockchain1);
network1.startServer(5010);

const blockchain2 = new Blockchain();
const network2 = new P2PNetwork(blockchain2);
network2.startServer(5020);

setTimeout(() => {
  network1.connectToPeer("ws://localhost:5020");

  const tx1 = new Transaction("Alice", "Bob", 100);
  blockchain1.addTransaction(tx1);

  console.log("Node 1: Mining new block...");
  blockchain1.minePendingTransactions("Miner1");

  network1.broadcastChain();

  setTimeout(() => {
    console.log("Node 2: Chain after synchronization:");
    console.log(JSON.stringify(blockchain2.chain, null, 2));
  }, 2000);
}, 1000);
