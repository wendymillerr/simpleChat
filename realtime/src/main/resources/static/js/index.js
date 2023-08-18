const websocket = new websocket('ws://localhost:8080/conect');
const Client = Stomp.over(socket);

function openPopUp(){
    const popup = document.getElementById('popupHidden');
    popup.classList.remove('hidden');
}



function openChat(){
    const popup = document.getElementById('popupHidden')
    const chatContainer = document.getElementById('chat-container')
    const usernameInput = document.getElementById('usernameInput').value;

    if(usernameInput !== ""){
        popup.classList.add('hidden')
        chatContainer.classList.remove('hidden')
        sessionStorage.setItem('user', usernameInput)
    }else{
       alert('Digite um nome válido!')
    }

}

function sendMessage(e){
    e.preventDefault();
    const messageInput = document.getElementById('message-input').value;

    const message = {
        user: sessionStorage.getItem('user'),
        message: messageInput
    };

    Client.send('/app/chatMessage', {}, JSON.stringify(message));
    document.getElementById('messageInput') = "";

    displayMessage('wendy', "oi");

}

function displayMessage(username, message){
    const chatMessages = document.getElementById('chat-messages');
    const messageElement = document.createElement('div');

    messageElement.textContent = username + ": " + message;
    chatMessages.appendChild(messageElement);

}

function connect(){
    Client.connect({}, function (frame){
        console.log('connected: ' + frame);


        Client.subscribe('/canal', function(message) {
            const chatMessage = JSON.parse(message.body);
            displayMessage(chatMessage.user, chatMessage.message);
        });
    });
}


connect();
openPopUp();