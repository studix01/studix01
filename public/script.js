document.getElementById("year").textContent = new Date().getFullYear();

function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("active");
}

function checkAnswer(button, correct) {
  const result = document.getElementById("quiz-result");

  if (correct) {
    result.textContent = "Correct! 🎉";
    result.style.color = "#079455";
  } else {
    result.textContent = "Not correct. Try again.";
    result.style.color = "#d92d20";
  }
}

const aiForm = document.getElementById("aiForm");
const question = document.getElementById("question");
const messages = document.getElementById("messages");

function addMessage(text, type, extra = "") {
  const message = document.createElement("div");
  message.className = `message ${type} ${extra}`;
  message.textContent = text;
  messages.appendChild(message);
  messages.scrollTop = messages.scrollHeight;
}

aiForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const text = question.value.trim();
  if (!text) return;

  addMessage(text, "user");
  question.value = "";

  addMessage("Thinking...", "ai", "loading");

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: text })
    });

    const data = await response.json();

    document.querySelector(".loading")?.remove();

    addMessage(data.reply || data.error || "Sorry, I could not answer.", "ai");
  } catch (error) {
    document.querySelector(".loading")?.remove();
    addMessage("AI Tutor is not connected yet. Your backend needs to be deployed.", "ai");
  }
});
