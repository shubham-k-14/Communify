// const socket = io('http://localhost:8000');

// const io = require("socket.io-client");

const socket = io("http://localhost:8000");



const form = document.getElementById('send-message');
const msgInput= document.getElementById('msgInput');
const msgContainer = document.querySelector('.container');
const displayUsers = document.querySelector('.display-users-container');


const append=(message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText= message;
    messageElement.classList.add('msg');
    messageElement.classList.add(position);
    msgContainer.append(messageElement);
}

form.addEventListener('submit',(e)=>{
e.preventDefault();
const message =  msgInput.value;
append(`You : ${message}`,'right');
socket.emit('send', message)
msgInput.value = "";
})

 
 

document.querySelector('#name-btn').addEventListener("click",()=>{
    const name =  document.getElementById('join-box').value;
    socket.emit('new-user-joined', name);
});





socket.on('user-joined' ,(user_name)=>{
    append(`${user_name} joined the chat`,'right');  
})



socket.on('receive',(data)=>{
    append(`${data.name} : ${data.message}`,'left')
})

socket.on('left',(name)=>{
    append(`${name} left the chat`,'left')
})
