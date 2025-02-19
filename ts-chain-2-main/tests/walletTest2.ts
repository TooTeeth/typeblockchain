import Wallet from "../wallet/Wallet";

const wallet = new Wallet();

const data = "Alice sends 50 coins to Bob";
const signature = wallet.signTransaction(data);

console.log("Signature", signature);

const isValid = Wallet.verifySignature(wallet.publicKey, data, signature);
console.log("Is signature valid?", isValid); //true

const tamperedData = "Alice sends 100 coins to Bob";
const isTamperedData = Wallet.verifySignature(wallet.publicKey, tamperedData, signature);
console.log("Is tampered signature valid?", isTamperedData); //false
