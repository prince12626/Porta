import express from "express";

const app = express();

app.get("/hello", (_req, res) => {
  res.json({
    message: "Hello from localhost!"
  });
});

app.listen(3000, () => {
  console.log("Local app running on 3000");
});