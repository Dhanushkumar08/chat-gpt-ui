document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.getElementById('sendButton');
    const messageInput = document.getElementById('messageInput');
    const chatMessages = document.querySelector('.chat-messages');
  
    // Event listener for the "Send" button
    sendButton.addEventListener('click', () => {
      const message = messageInput.value.trim();
      if (message) {
        // Display user's message
        const userMessage = document.createElement('div');
        userMessage.classList.add('message', 'user-message');
        userMessage.textContent = message;
        chatMessages.appendChild(userMessage);
        
        // Clear input field
        messageInput.value = '';
  
        // Send message to backend (replace with your actual API URL)
        fetch('http://192.168.208.129:35631/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message })
        })
        .then(response => response.json())
        .then(data => {
          // Display bot's response
          const botMessage = document.createElement('div');
          botMessage.classList.add('message', 'bot-message');
          botMessage.textContent = data.reply;  // Assume 'reply' is the key in the response
          chatMessages.appendChild(botMessage);
        })
        .catch(error => {
          console.error('Error sending message:', error);
        });
      }
    });
  });
  