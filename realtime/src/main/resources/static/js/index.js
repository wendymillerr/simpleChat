const socket = new WebSocket('ws://localhost:8080/conect');
const Client = Stomp.over(socket);


function openPopUp(){
    const popup = document.getElementById('popupHidden');
   // popup.classList.remove('hidden');

}


function openChat(){
    const popup = document.getElementById('popupHidden')
    const chatContainer = document.getElementById('chat-container')
    const usernameInput = document.getElementById('usernameInput').value;

    if(usernameInput !== ""){
        popup.style.display = "none"
        chatContainer.classList.remove('hidden');
        sessionStorage.setItem('user', usernameInput)
    }else{
       alert('Digite um nome válido!')
    }

}


function sendMessage(e){
    e.preventDefault();
    const messageInput = document.getElementsByClassName('message-input').value;

    const message = {
        user: sessionStorage.getItem('user'),
        message: messageInput
    };

    Client.send('/app/chatMessage', {}, JSON.stringify(message));
    document.getElementById('message-input').value = "";


}


function displayMessage(username, message){
    alert('display')
    const chatMessages = document.getElementsById('chat-messages');
    const messageElement = document.createElement('div');

    messageElement.textContent = username + ": " + message;
    chatMessages.appendChild(messageElement);

}

function conect(){
    Client.connect({}, function (frame){
        console.log('connected: ' + frame);


        Client.subscribe('/chat', function(message) {
            const chatMessage = JSON.parse(message.body);
            displayMessage(chatMessage.user, chatMessage.message);
        });
    });

    
    alert('entrou em connect')
}


conect();
openPopUp();
