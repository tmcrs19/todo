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

let postCounter = 1;

app.prepare().then(() => {
  const server = createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("Client connected");

    // Broadcast a new post to all clients
    const broadcastNewPost = () => {
      const timestamp = new Date().toISOString();
      const newPost = {
        id: new Date().getTime(),
        title: `WEBSOCKET POST ${postCounter}`,
        body: `This is post number ${postCounter} created at ${timestamp}`,
        userId: Math.floor(Math.random() * 10) + 1,
      };
      io.emit("newPost", newPost);
      postCounter += 1;
    };

    // Simulate a new post every 10 seconds
    const interval = setInterval(broadcastNewPost, 10000);

    socket.on("disconnect", () => {
      console.log("Client disconnected");
      clearInterval(interval);
    });
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on https://localhost:3000");
  });
});
