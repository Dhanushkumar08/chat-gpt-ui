import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const backendUrl = "http://192.168.208.202:8080";  // Update to your backend URL
      const res = await fetch(`${backendUrl}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      setResponse(data.response);  // Assume backend returns response in a field called 'response'
    } catch (error) {
      setResponse("Error: " + error.message);
    }

    setLoading(false);
  };

  return (
    <div className="App">
      <h1>ChatGPT Frontend</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Send"}
        </button>
      </form>
      <div className="response">
        <h2>Response:</h2>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default App;
