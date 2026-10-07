const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Serve index.html for all routes (SPA)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// API endpoint for AI chat
app.post("/api/chat", (req, res) => {
  const { message } = req.body || {};

  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  return res.json({ reply: generateAIReply(message) });
});

// API endpoint for quiz answers
app.post("/api/quiz", (req, res) => {
  const { question, answer } = req.body || {};

  if (!question || !answer) {
    return res.status(400).json({ error: "Question and answer are required." });
  }

  const isCorrect = checkAnswer(question, answer);
  return res.json({ correct: isCorrect, feedback: getFeedback(question, answer, isCorrect) });
});

// API endpoint for contact form
app.post("/api/contact", (req, res) => {
  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  console.log("Contact form submission:", { name, email, subject, message });

  return res.json({ success: true, message: "Your message has been received. We'll get back to you soon!" });
});

function generateAIReply(message) {
  const text = message.toLowerCase();

  const responses = {
    photosynthesis: "Photosynthesis is the process plants use to convert sunlight into energy. It happens in two stages: light-dependent reactions and the Calvin cycle. The equation is: 6CO2 + 6H2O + light energy → C6H12O6 + 6O2.",
    
    mathematics: "Mathematics is about solving problems using numbers and logic. Start by understanding the concepts, practice regularly, and don't be afraid to ask questions when stuck.",
    
    algebra: "Algebra involves using letters to represent unknown numbers. Key tips: identify what you're solving for, isolate the variable, and check your answer by substituting back.",
    
    calculus: "Calculus studies change and motion. It has two main parts: derivatives (rates of change) and integrals (accumulation). Start with limits and derivatives before moving to integrals.",
    
    physics: "Physics explains how the universe works using laws of motion, energy, forces, and waves. Break problems into: identify known values, choose the right formula, and solve step by step.",
    
    chemistry: "Chemistry studies matter and reactions. Learn the periodic table, atomic structure, bonding, and reaction types. Use models to visualize molecules and practice balancing equations.",
    
    biology: "Biology studies living organisms. Key areas: cells, genetics, evolution, ecology, and human systems. Use diagrams and models to understand complex structures.",
    
    english: "English covers grammar, vocabulary, reading, and writing. Read widely, practice writing daily, and learn grammar rules through examples.",
    
    geography: "Geography studies places, people, and environments. Learn map skills, climate zones, resources, and how human societies interact with nature.",
    
    ict: "ICT (Information and Communication Technology) covers computers, coding, and digital tools. Start with basics: hardware, software, networks, and then learn programming.",
  };

  for (const [key, value] of Object.entries(responses)) {
    if (text.includes(key)) {
      return value;
    }
  }

  return "That's an interesting question! Try breaking it down into smaller parts. Learn the key concepts first, then work through examples. If you need help with a specific topic, ask me directly about subjects like Mathematics, Physics, Chemistry, Biology, English, Geography, or ICT.";
}

function checkAnswer(question, answer) {
  const answers = {
    "What is 12 × 5?": "60",
    "What is the capital of Rwanda?": "Kigali",
    "What is photosynthesis?": "process",
    "What is H2O?": "water",
    "What is the square root of 16?": "4"
  };

  const correct = answers[question];
  return correct && answer.toLowerCase().includes(correct.toLowerCase());
}

function getFeedback(question, answer, isCorrect) {
  if (isCorrect) {
    return {
      message: "Excellent! You got it right! 🎉",
      color: "#079455"
    };
  } else {
    return {
      message: "Not quite. Try again or ask the AI tutor for help.",
      color: "#d92d20"
    };
  }
}

app.listen(PORT, () => {
  console.log(`🚀 Studix01.net is running at http://localhost:${PORT}`);
  console.log(`📚 Open the browser and navigate to http://localhost:${PORT}`);
});