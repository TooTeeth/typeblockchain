import { Router } from "express";
import Blockchain from "../blockchain/Blockchain";
import Wallet from "../wallet/Wallet";
import { error } from "console";
import Transaction from "../blockchain/Transaction";

const router = Router();
const blockchain = new Blockchain();
const wallets: Record<string, Wallet> = {}; //Record = 입력한 그대로 보여줌 솔리디티의 매핑과 비슷하다

/*router.get("/", (req, res) => {
  console.log(req.body);
  return res.json({ message: "This is api route." });
}); - server.ts와 연결하면 포스트맨 바디에 메세지 표시*/

router.get("/blocks", (_, res) => {
  return res.json(blockchain.chain);
}); //http://localhost:3000/api/blocks GET요청시 바디에 블록 표시 또는 웹브라우저도 가능

/*router.get("/blocks/:index", (req, res) => {
  console.log(req.params);

  return res.json({ message: "message" });
}); http://localhost:3000/api/blocks/1 또는 http://localhost:3000/api/blocks/(숫자입력) - { message: "message" } 표시됨 */

router.get("/blocks/:index", (req, res) => {
  const { index } = req.params; //params = url 변수값을 받아옴 - /blocks/5 이라면 req.params.index = 5
  const block = blockchain.chain[Number(index)];
  if (!block) {
    return res.status(404).json({ error: "Block not found" });
  }

  return res.json(block); //객체는 형변환이 필요하지 않음
});

//post 무언가를 생성해주는 기능 - 지갑 생성하기
router.post("/wallet", (_, res) => {
  const wallet = new Wallet();
  wallets[wallet.address] = wallet;

  return res.json(wallet);
});

//지갑 정보 받아오기
router.get("/wallet/:address", (req, res) => {
  const { address } = req.params;
  const wallet = wallets[address];

  if (!wallet) {
    return res.status(404).json({ error: "Wallet not found" });
  }

  return res.json(wallet);
}); //http://localhost:3000/api/wallet/(지갑주소)

router.post("/transaction", (req, res) => {
  const { sender, receiver, amount } = req.body;

  if (!sender || !receiver || typeof amount !== "number" || amount <= 0) {
    return res.status(400).json({ error: "Invalid transaction data" });
  }

  const senderWallet = Object.values(wallets).find((wallet) => wallet.address === sender);
  if (!senderWallet) {
    return res.status(400).json({ error: "Invalid sender address" });
  }

  const transaction = new Transaction(senderWallet.address, receiver, amount);

  try {
    transaction.signTransaction(senderWallet);
    blockchain.addTransaction(transaction);
    return res.json(transaction);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    } else {
      return res.status(400).json({ error: "Unknown error occurred" });
    }
  }
});

router.get("/transaction", (_, res) => {
  return res.json(blockchain.transactionPool);
});

export default router;
