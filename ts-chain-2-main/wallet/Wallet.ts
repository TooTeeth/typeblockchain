import { ec as EC } from "elliptic";
import * as crypto from "crypto";

const ec = new EC("secp256k1"); //알고리즘

export interface WalletData {
  privateKey: string;
  publicKey: string;
  address: string;
}

class Wallet implements WalletData {
  privateKey: string;
  publicKey: string;
  address: string;

  constructor() {
    const keypair = ec.genKeyPair();
    this.privateKey = keypair.getPrivate("hex");
    this.publicKey = keypair.getPublic("hex");

    this.address = crypto.createHash("sha256").update(this.publicKey).digest("hex");
  }

  signTransaction(data: string): string {
    const keyPair = ec.keyFromPrivate(this.privateKey, "hex");
    const hash = crypto.createHash("sha256").update(data).digest("hex");
    const signature = keyPair.sign(hash, "base64");
    return signature.toDER("hex"); //toDer = digest 16진수로 변환
  }

  static verifySignature(publicKey: string, data: string, signature: string): boolean {
    const keyPair = ec.keyFromPublic(publicKey, "hex");
    const hash = crypto.createHash("sha256").update(data).digest("hex");
    return keyPair.verify(hash, signature);
  } //static은 인스턴스화 하지 않고도 함수명을 통해 호출이 가능하게 해준다.

  toString(): string {
    return JSON.stringify(this); //this는 Wallet
    /*강의 교안도 확인해보기 */
  }
}

export default Wallet;
