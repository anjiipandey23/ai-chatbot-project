// Send Message Function
function sendMessage() {
    const input = document.getElementById("user-input");
    const message = input.value.trim();
    const chatBox = document.getElementById("chat-box");

    if (message === "") return;

    addMessage(message, "user");
    input.value = "";

    showTypingAnimation();

    setTimeout(() => {
        removeTypingAnimation();
        const response = getBotResponse(message);
        addMessage(response, "bot");
    }, 1000);
}

// Add Message with Timestamp
function addMessage(text, sender) {
    const chatBox = document.getElementById("chat-box");

    const msgDiv = document.createElement("div");
    msgDiv.className = sender === "user" ? "user-message" : "bot-message";

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    msgDiv.innerHTML = `
        <span>${text}</span>
        <div class="timestamp">${time}</div>
    `;

    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Typing Animation
function showTypingAnimation() {
    const chatBox = document.getElementById("chat-box");

    const typingDiv = document.createElement("div");
    typingDiv.className = "bot-message typing";
    typingDiv.id = "typing";
    typingDiv.innerText = "Typing...";
    chatBox.appendChild(typingDiv);

    chatBox.scrollTop = chatBox.scrollHeight;
}

function removeTypingAnimation() {
    const typingDiv = document.getElementById("typing");
    if (typingDiv) typingDiv.remove();
}

// Smart Rule-Based Replies
function getBotResponse(input) {
    input = input.toLowerCase();

    if (input.includes("hello") || input.includes("hi"))
        return "Hello 👋! How can I assist you today?";

    if (input.includes("name"))
        return "I am your Smart AI Assistant 🤖";

    if (input.includes("how are you"))
        return "I'm functioning perfectly! Thanks for asking 😊";

    if (input.includes("bye"))
        return "Goodbye! Have a wonderful day 🌸";

    if (input.includes("thank"))
        return "You're welcome! 😊";

    if (input.includes("time"))
        return "Current time is " + new Date().toLocaleTimeString();

    return "Sorry, I don't understand that yet.";
}

// Enter Key Support
function handleEnter(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

// Clear Chat
document.getElementById("clearChatBtn")?.addEventListener("click", () => {
    document.getElementById("chat-box").innerHTML = `
        <div class="bot-message">Chat cleared! How can I help you again? 😊</div>
    `;
});

// Dark Mode Toggle
document.getElementById("darkModeBtn")?.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
});