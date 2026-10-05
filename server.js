const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.post("/api/chat", (req, res) => {
  const { message } = req.body || {};

  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  return res.json({ reply: generateReply(message) });
});

function generateReply(message) {
  const text = message.toLowerCase();

  if (text.includes("photosynthesis")) {
    return "Photosynthesis is the process plants use to make food using sunlight, water, and carbon dioxide. It produces glucose and oxygen.";
  }

  if (text.includes("math") || text.includes("algebra") || text.includes("equation")) {
    return "A good way to approach math is to break the problem into steps, identify the known values, and solve one piece at a time.";
  }

  if (text.includes("physics")) {
    return "In physics, try to identify the quantities involved such as force, mass, speed, and time, then use the correct formula.";
  }

  if (text.includes("biology")) {
    return "Biology studies living things. Start by learning key terms and how systems work together, such as cells, tissues, and organs.";
  }

  return "That’s a good question. Try to break it into smaller ideas, learn the key definitions, and then connect them to examples you already know.";
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Studix01.net is running at http://localhost:${PORT}`);
});
