// const express=require ("express") 
// const app=express() ;
// const cors=require("cors")

// const dotenv=require("dotenv").config()
// port=process.env.PORT

// const routes = require('./routes/routes')
// app.use(express.json())
// app.use(cors())
// app.use("/redbus",routes)
// app.listen(port,(err)=>{
//     if(err)
//         {
//             console.log("there is error in starting the server")
//         }
//         else{
//             console.log("server is running on port",port)
//         }
// })


const express = require("express");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv").config();
const WebSocket = require("ws");


const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3001;

const routes = require('./routes/routes');

app.use(express.json());
app.use(cors());
app.use("/redbus", routes);

// Setting up WebSocket server
const wss = new WebSocket.Server({ server, path: "/ws" });

wss.on("connection", (ws) => {
    console.log("New WebSocket connection");

    ws.on("message", (message) => {
        console.log("Received:", message);
        ws.send("Message received by server");
    });

    ws.on("close", () => {
        console.log("WebSocket connection closed");
    });
});

server.listen(port, (err) => {
    if (err) {
        console.log("There is an error in starting the server");
    } else {
        console.log("Server is running on port", port);
    }
});
