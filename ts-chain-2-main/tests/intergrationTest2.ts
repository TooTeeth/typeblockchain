import Blockchain from "../blockchain/Blockchain";
import Transaction from "../blockchain/Transaction";
import P2PNetwork from "../network/P2PNetwork";
import Wallet from "../wallet/Wallet";

const aliceWallet = new Wallet();
const bobWallet = new Wallet();

const blockchain1 = new Blockchain();
const network1 = new P2PNetwork(blockchain1);
network1.startServer(5010);

const blockchain2 = new Blockchain();
const network2 = new P2PNetwork(blockchain2);
network2.startServer(5020);

setTimeout(() => {
  network1.autoConnectPeers(["ws://localhost:5020"]);
  network1.checkNodeHealth();

  blockchain1.minePendingTransactions(aliceWallet.address);

  const generateBlock = () => {
    const tx = new Transaction(aliceWallet.address, bobWallet.address, 25);
    tx.signTransaction(aliceWallet);
    blockchain1.addTransaction(tx);

    blockchain1.minePendingTransactions(aliceWallet.address);

    network1.broadcastChain();
  };

  for (let i = 0; i < 1; i++) {
    generateBlock();
  }

  setTimeout(() => {
    console.log("Node 1 Blockchain:");
    console.log(JSON.stringify(blockchain1, null, 2));

    console.log("Node 2 Blockchain:");
    console.log(JSON.stringify(blockchain2, null, 2));

    console.log("Blockchain1 Alice Balance:", blockchain1.getBalanceOfAddress(aliceWallet.address));
    console.log("Blockchain1 Bob Balance:", blockchain1.getBalanceOfAddress(bobWallet.address));

    console.log("Blockchain2 Alice Balance:", blockchain1.getBalanceOfAddress(aliceWallet.address));
    console.log("Blockchain2 Bob Balance:", blockchain1.getBalanceOfAddress(bobWallet.address));
  }, 2000);
}, 1000);
