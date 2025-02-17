import WebSocket, { WebSocketServer } from "ws";

class P2PNetwork {
  sockets: WebSocket[] = [];

  startServer(port: number): void {
    const server = new WebSocketServer({ port });
    console.log(`WebSocket server started on port ${port}`);

    server.on("connection", (socket) => {
      this.connectSocket(socket);
    });
  }

  connectToPeer(peer: string): void {
    const socket = new WebSocket(peer);

    socket.on("open", () => {
      console.log(`Connected to peer: ${peer}`);
      this.connectSocket(socket);
    });

    socket.on("error", (error) => {
      console.error(`Connection error with peer ${peer}: ${error.message}`);
    });
  }

  connectSocket(socket: WebSocket): void {
    this.sockets.push(socket);

    const remoteAddress = socket.url || "Unknown";
    console.log(`Socket connected to peer at ${remoteAddress}`);

    socket.on("message", (message) => {
      console.log(`Received message from ${remoteAddress}: ${message}`);
    });

    this.broadcast(`A new peer has joined the network from ${remoteAddress}`);
  }

  broadcast(message: string): void {
    this.sockets.forEach((socket) => socket.send(message));
    console.log(`Broadcated message: "${message}" to all connected peers`);
  }
}

export default P2PNetwork;
