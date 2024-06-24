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

  let postEmitted = false;
  let newPost = null;

  const broadcastNewPost = () => {
    if (!postEmitted) {
      newPost = {
        id: new Date().getTime(),
        title: "WEBSOCKET POST",
        body: "WEBSOCKET POST BODY",
        userId: 7,
      };
      io.emit("newPost", newPost);
      postEmitted = true;
    }
  };

  io.on("connection", (socket) => {
    console.log(socket.id);
    console.log("Client connected");

    if (postEmitted && newPost) {
      socket.emit("newPost", newPost);
    }

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  // Emit the post once after 10 seconds
  setTimeout(broadcastNewPost, 10000);

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on https://localhost:3000");
  });
});
