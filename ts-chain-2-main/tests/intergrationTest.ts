import Blockchain from "../blockchain/Blockchain";
import Transaction from "../blockchain/Transaction";
import P2PNetwork from "../network/P2PNetwork";
import Wallet from "../wallet/Wallet";

const aliceWallet = new Wallet();
const bobWallet = new Wallet();
const charlieWallet = new Wallet();
const minerWallet = new Wallet();

const blockchain1 = new Blockchain();
const network1 = new P2PNetwork(blockchain1);
network1.startServer(5010);

const blockchain2 = new Blockchain();
const network2 = new P2PNetwork(blockchain2);
network2.startServer(5020);

setTimeout(() => {
  network1.connectToPeer("ws://localhost:5020");

  const tx1 = new Transaction(aliceWallet.address, bobWallet.address, 100);
  tx1.signTransaction(aliceWallet);
  const tx2 = new Transaction(bobWallet.address, charlieWallet.address, 50);
  tx2.signTransaction(bobWallet);

  blockchain1.addTransaction(tx1);
  blockchain1.addTransaction(tx2);
  blockchain1.minePendingTransactions(minerWallet.address);

  network1.broadcastChain();

  setTimeout(() => {
    console.log("Node 1 Blockchain:");
    console.log(JSON.stringify(blockchain1, null, 2));

    console.log("Node 2 Blockchain:");
    console.log(JSON.stringify(blockchain2, null, 2));

    console.log("Is Node 1 Blockchain valid?", blockchain1.isChainValid());
    console.log("Is Node 2 Blockchain valid?", blockchain2.isChainValid());

    console.log("Alice Balance:", blockchain1.getBalanceOfAddress(aliceWallet.address));
    console.log("Bob Balance:", blockchain1.getBalanceOfAddress(bobWallet.address));
    console.log("Charlie Balance:", blockchain1.getBalanceOfAddress(charlieWallet.address));
    console.log("Miner Balance:", blockchain1.getBalanceOfAddress(minerWallet.address));

    process.exit(0);
  }, 2000);
}, 1000);
