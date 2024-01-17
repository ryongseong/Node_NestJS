const socket = io();

const query = new URLSearchParams(location.search);
// '?username=Ryong&room=Rommy'
const username = query.get('username');
// 'Ryong'
const room = query.get('room');
// 'Rommy'

socket.emit('join', {username, room}, (error) => {
    if (error) {
        alert(error);
        location.href = '/';
    }
});

const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML;

socket.on('roomData', ({room, users}) => {
    const html = Mustache.render(sidebarTemplate, {
        room,
        users
    })

    document.querySelector('#sidebar').innerHTML = html;
})

const messageTemplate = document.querySelector('#message-template').innerHTML;
const messages = document.querySelector('#messages');

socket.on('message', (message) => {
    const html = Mustache.render(messageTemplate, {
        username: message.username,
        message: message.text,
        createdAt: moment(message.createdAt).format('h:mm a')
    })
    messages.insertAdjacentHTML('beforeend', html);

    scrollToBottom();
})

function scrollToBottom() {
    messages.scrollTop = messages.scrollHeight;
}

const messageForm = document.querySelector('#message-form');
const messageFormInput = messageForm.querySelector('input');
const messageFormButton = messageForm.querySelector('button');

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();

    messageFormButton.setAttribute('disabled', 'disabled');

    const message = e.target.elements.message.value;

    socket.emit('sendMessage', message, (error) => {
        messageFormButton.removeAttribute('disabled');
        messageFormInput.value = '';
        messageFormInput.focus();

        if (error) {
            return console.log(error);
        }
    })
})