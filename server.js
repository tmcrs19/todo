const { createServer } = require("https");
const { parse } = require("url");
const next = require("next");
const fs = require("fs");
const path = require("path");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, "localhost-key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "localhost.pem")),
};

app.prepare().then(() => {
  const server = createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("Client connected");

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });

    // Broadcast a new post to all clients
    const broadcastNewPost = () => {
      const newPost = {
        id: new Date().getTime(),
        title: "WEBSOCKET",
        body: "NEW WEBSOCKET POST",
        userId: 5,
      };
      io.emit("newPost", newPost);
    };

    // Simulate a new post every 10 seconds
    const interval = setInterval(broadcastNewPost, 10000);

    socket.on("close", () => {
      clearInterval(interval);
    });
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on https://localhost:3000");
  });
});
