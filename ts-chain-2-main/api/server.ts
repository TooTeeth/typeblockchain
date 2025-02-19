import express from "express";
import cors from "cors";
import routes from "./routes";

const PORT = 3000; //몇 번 포트를 열지 설정 - 중복은 안된다. port 1~1024는 예약한 포트 - 사용 불가.

const app = express(); //보통 이렇게 시작

app.use(express.json()); //json번역기 = 미들웨어 = 서버와 클라이언트 중간에서 함수를 실행해서 로직을 처리해줌
app.use(cors()); //백엔드랑 주소가 일치하지 않을 때 허용해주는 것.

app.use("/api", routes); //routes.ts 불러오기

/* "/"로 3000번 포트가 들어오면 콜백 함수를 만난다.
req - requset = 요청, res - result = 응답
app.get("/", (req, res) => {
  res.json({ hello: "express!" }); 데이터를 전달 - 화면에 표시
}); */

/*app.get("/", (req, res) => {
  res.send("Hello, ExpressJS!"); - send보다는 json을 사용.
});*/

app.get("/", (req, res) => {
  return res.json({ message: "Hello, Express!" });
});

/*app.post("/", (req, res) => {
  console.log(req.body); //포스트맨 body에 입력한 값이 post에서 send를 누르면 터미널에 표시.
  res.json({ hello: "express!" });
});*/

// listen 서버 스타터
app.listen(PORT, () => {
  console.log(`Blockchain API server running on http://localhost:${PORT}`);
});
