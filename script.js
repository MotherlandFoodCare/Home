async function sendMessage() {
    const userInput = document.getElementById('userInput').value;
    if (!userInput) return;

    // Display user's message
    const chatbox = document.getElementById('chatbox');
    const userMessage = document.createElement('div');
    userMessage.classList.add('user-message');
    userMessage.textContent = userInput;
    chatbox.appendChild(userMessage);

    // Clear input field
    document.getElementById('userInput').value = '';

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer YOUR_API_KEY`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: userInput }]
        })
    });

    const data = await response.json();
    const botMessageContent = data.choices[0].message.content;

    // Display bot's message
    const botMessage = document.createElement('div');
    botMessage.classList.add('bot-message');
    botMessage.textContent = botMessageContent;
    chatbox.appendChild(botMessage);

    // Scroll to the bottom
    chatbox.scrollTop = chatbox.scrollHeight;
}
