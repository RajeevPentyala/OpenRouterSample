import { useState } from "react";
import "./Chat.css";

// ============================================================
// Chat Component — Talks to OpenRouter using plain fetch()
// ============================================================
// OpenRouter provides a unified API for 100+ AI models.
// We're using NVIDIA Nemotron 3 Super (free tier).
// The API is OpenAI-compatible: POST to /chat/completions
// ============================================================

function Chat() {
  // --- State ---
  const [messages, setMessages] = useState([]); // Conversation history
  const [input, setInput] = useState(""); // Current input text
  const [loading, setLoading] = useState(false); // Is the AI thinking?
  const [error, setError] = useState(null); // Error message if something goes wrong

  // --- Configuration ---
  const API_URL = "https://openrouter.ai/api/v1/chat/completions";
  const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
  const MODEL = "nvidia/nemotron-3-super-120b-a12b:free";

  // --- Send a message to the AI ---
  const sendMessage = async () => {
    // Don't send empty messages
    if (!input.trim()) return;

    // Clear any previous error
    setError(null);

    // Add the user's message to the conversation
    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      // Call OpenRouter API using plain fetch()
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: MODEL,
          messages: updatedMessages,
        }),
      });

      // Check if the API returned an error
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `API error: ${response.status}`);
      }

      // Parse the response
      const data = await response.json();
      const assistantMessage = {
        role: "assistant",
        content: data.choices[0].message.content,
      };

      // Add the AI's reply to the conversation
      setMessages([...updatedMessages, assistantMessage]);
    } catch (err) {
      // Show error to the user
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // --- Handle Enter key press ---
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading) {
      sendMessage();
    }
  };

  // --- Render ---
  return (
    <div className="chat-container">
      <h1 className="chat-title">🤖 OpenRouter Chat</h1>
      <p className="chat-subtitle">
        Powered by NVIDIA Nemotron 3 Super (Free) via OpenRouter
      </p>

      {/* Message List */}
      <div className="chat-messages">
        {messages.length === 0 && (
          <p className="chat-empty">Send a message to start chatting!</p>
        )}
        {messages.map((msg, index) => (
          <div key={index} className={`chat-bubble ${msg.role}`}>
            <span className="chat-role">
              {msg.role === "user" ? "You" : "AI"}
            </span>
            <p className="chat-text">{msg.content}</p>
          </div>
        ))}
        {loading && (
          <div className="chat-bubble assistant">
            <span className="chat-role">AI</span>
            <p className="chat-text thinking">Thinking...</p>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && <p className="chat-error">⚠️ {error}</p>}

      {/* Input Area */}
      <div className="chat-input-area">
        <input
          type="text"
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          disabled={loading}
        />
        <button
          className="chat-send-btn"
          onClick={sendMessage}
          disabled={loading || !input.trim()}
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default Chat;
