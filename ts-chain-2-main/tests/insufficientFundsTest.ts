import Blockchain from "../blockchain/Blockchain";
import Transaction from "../blockchain/Transaction";
import Wallet from "../wallet/Wallet";

const blockchain = new Blockchain();

const aliceWallet = new Wallet();
const bobWallet = new Wallet();

const tx = new Transaction(aliceWallet.address, bobWallet.address, 25);
tx.signTransaction(aliceWallet);
blockchain.addTransaction(tx);
