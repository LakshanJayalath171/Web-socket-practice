import { WebSocket, WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

// connection event
wss.on("connection", (soket , request) => {
  const ip = request.socket.remoteAddress;

  soket.on("message",(rawData)=>{
    const message = rawData.toString();
    console.log({rawData});

    wss.clients.forEach((client)=>{
        if(client.readyState === WebSocket.OPEN)client.send(`server broadcasting ${message}`);
    })
  })


  soket.on("error",(err)=>{
    console.log(`client ${ip} error: ${err}`);
  })

  soket.on("close",()=>{
    console.log(`client ${ip} disconnected`);
  })
});


console.log("websocket server is running on port 8080");