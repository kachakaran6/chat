document.getElementById('send').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const message = document.getElementById('message').value;

    if (username && message) {
        fetch('send_message.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `username=${encodeURIComponent(username)}&message=${encodeURIComponent(message)}`
        })
        .then(response => response.text())
        .then(data => {
            document.getElementById('message').value = '';
            loadMessages();
        });
    }
});

function loadMessages() {
    fetch('get_messages.php')
        .then(response => response.json())
        .then(data => {
            const messagesDiv = document.getElementById('messages');
            messagesDiv.innerHTML = '';
            data.forEach(msg => {
                messagesDiv.innerHTML += `<div><strong>${msg.username}:</strong> ${msg.message}</div>`;
            });
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        });
}

setInterval(loadMessages, 1000);