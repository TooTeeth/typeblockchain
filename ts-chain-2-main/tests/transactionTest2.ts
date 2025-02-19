import Blockchain from "../blockchain/Blockchain";
import Transaction from "../blockchain/Transaction";
import Wallet from "../wallet/Wallet";

const aliceWallet = new Wallet();
const bobWallet = new Wallet();
const minerWallet = new Wallet();

const myBlockchain = new Blockchain();

const tx1 = new Transaction(aliceWallet.publicKey, bobWallet.address, 100);
tx1.signTransaction(aliceWallet);

myBlockchain.addTransaction(tx1);
myBlockchain.minePendingTransactions(minerWallet.address);
