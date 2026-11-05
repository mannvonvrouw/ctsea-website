document.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector("main");

  // Replace the default static content with a chat container structure
  main.innerHTML = `
    <h1>ctseaGPT</h1>
    <div id="chat-container" style="display: flex; flex-direction: column; height: 60vh; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; overflow: hidden; background: rgba(0,0,0,0.2); margin-bottom: 20px;">
      <div id="chat-messages" style="flex: 1; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 15px;">
        <div class="message ai-message" style="align-self: flex-start; background: rgba(255,255,255,0.1); padding: 12px 16px; border-radius: 8px; max-width: 75%;">
          Hello! I am ctseaGPT. Ask me anything.
        </div>
      </div>
      <div id="chat-input-area" style="display: flex; padding: 15px; border-top: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.3);">
        <input type="text" id="user-input" placeholder="Type a message..." style="flex: 1; padding: 10px 14px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.2); background: rgba(255,255,255,0.05); color: inherit; outline: none;" />
        <button id="send-btn" style="margin-left: 10px; padding: 10px 20px; border-radius: 4px; border: none; background: #4f46e5; color: white; cursor: pointer; font-weight: bold;">Send</button>
      </div>
    </div>
  `;

  const chatMessages = document.getElementById("chat-messages");
  const userInput = document.getElementById("user-input");
  const sendBtn = document.getElementById("send-btn");

  const aiResponseText = "did you really try to use ctseaGPT? a random geopol minecraft nation's gpt? you thought this was a real ai?";

  function appendMessage(text, sender) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message", `${sender}-message`);

    if (sender === "user") {
      msgDiv.style.alignSelf = "flex-end";
      msgDiv.style.background = "#4f46e5";
      msgDiv.style.color = "white";
    } else {
      msgDiv.style.alignSelf = "flex-start";
      msgDiv.style.background = "rgba(255,255,255,0.1)";
    }
    
    msgDiv.style.padding = "12px 16px";
    msgDiv.style.borderRadius = "8px";
    msgDiv.style.maxWidth = "75%";
    msgDiv.style.wordBreak = "break-word";
    msgDiv.textContent = text;

    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function handleUserSubmit() {
    const text = userInput.value.trim();
    if (!text) return;

    appendMessage(text, "user");
    userInput.value = "";

    setTimeout(() => {
      appendMessage(aiResponseText, "ai");
    }, 600);
  }

  sendBtn.addEventListener("click", handleUserSubmit);
  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleUserSubmit();
    }
  });
});
