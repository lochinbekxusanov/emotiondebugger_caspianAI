const express = require("express");
const cors = require("cors");
const path = require("path");
const { analyzeText } = require("./analyzer");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "frontend")));

app.post("/api/debug", (req, res) => {
  const { text } = req.body;

  if (!text || !text.trim()) {
    return res.status(400).json({
      status: "ERROR",
      errorType: "EmptyInputException",
      stackTrace: ["at RequestValidator.check() — input string is empty"],
      fixes: ["Iltimos, hozirgi holatingizni yozing"]
    });
  }

  const result = analyzeText(text);
  res.json(result);
});

app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Emotion Debugger backend running on port ${PORT}`);
});
