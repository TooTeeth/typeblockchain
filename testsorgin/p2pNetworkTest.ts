import P2PNetwork from "../network/P2PNetwork";

const server1 = new P2PNetwork();
server1.startServer(5010);

const server2 = new P2PNetwork();
server2.startServer(5020);

setTimeout(() => {
  server1.connectToPeer("ws://localhost:5020");
  server2.connectToPeer("ws://localhost:5010");
}, 1000);
