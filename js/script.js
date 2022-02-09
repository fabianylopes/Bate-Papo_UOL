let nickName;

function getMessages(){
    const promise = axios.get('https://mock-api.driven.com.br/api/v4/uol/messages');

    promise.then(loadMessages);
}

function loadMessages(response){
    const chatMessages = document.querySelector('.messages-list');
    chatMessages.innerHTML = '';
    
    let info = response.data;
    
    for(let i = 0; i < info.length; i++){
        
        let time = info[i].time;
        let from = info[i].from;
        let to = info[i].to;
        let text = info[i].text;

        if(info[i].type === 'status'){
            chatMessages.innerHTML += `
            <li class="message">
                <p class="status" data-identifier="message">
                    <span class="time">(${time})</span>
                    <span class="fromTo">${from}</span>${text}
                </p>
            </li>
            `
        }else if(info[i].type === 'message'){
            chatMessages.innerHTML += `
            <li class="message">
                <p class="normal" data-identifier="message">
                    <span class="time">(${time})</span>
                    <span class="fromTo">${from}</span>para 
                    <span class="fromTo">${to}:</span>${text}
                </p>
            </li>
            `
        }else if(info[i].type === "private_message" && info[i].to === nickName){
            chatMessages.innerHTML += `
            <li class="message">
                <p class="private" data-identifier="message">
                    <span class="time">(${time})</span>
                    <span class="fromTo">${from}</span>reservadamente para
                    <span class="fromTo">${to}:</span>:${text}
                </p>
            </li>
            `
        }
    }

    scrollToLastMessage();
}

function scrollToLastMessage(){
    const lastMessage = document.querySelector('ul li:last-child');
    lastMessage.scrollIntoView();
}

function askName(){
    nickName = prompt('Qual o seu lindo nome? ');
    
    const promise = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', {name:nickName});
    
    promise.then(enterChat);
    promise.catch(handleName);
}

function enterChat(){
    setInterval(keepConnection, 5000);
}

function handleName(){
    alert('Nome já cadastrado!\nTente novamente.');
    askName();
}

function keepConnection(){
    axios.post('https://mock-api.driven.com.br/api/v4/uol/status', {name:nickName});
}

function sendMessage(){
    const inputMessage = document.querySelector('input');

    const promise = axios.post('https://mock-api.driven.com.br/api/v4/uol/messages', 
    {
        from: nickName,
        to: "Todos",
        text: inputMessage.value,
        type: "message" 
    }
    );

    inputMessage.value = '';

    promise.then(getMessages);
    promise.catch(reloadPage);
}

function reloadPage(){
    window.location.reload();
}

document.addEventListener("keypress", function(e){
	if(e.key === 'Enter'){
		const button = document.querySelector('#submit');
		button.click();
	}
});

function startChat(){
    getMessages();
    setInterval(getMessages, 3000);

    askName();
}

startChat();
