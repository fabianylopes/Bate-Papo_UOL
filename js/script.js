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

const enterInput = document.querySelector('.enter-chat');

function login(){
    nickName = enterInput.value;
    
    const promise = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', {name:nickName});
    
    promise.then(enterChat);
    promise.catch(handleName);
}

function enterChat(){
    const home = document.querySelector('.homePage');
    home.classList.add('hide');

    const page = document.querySelector('.container');
    page.classList.remove('hide');
    
    getMessages();
    setInterval(getMessages, 3000);
    setInterval(keepConnection, 5000);
}

function handleName(){
    alert('Nome já cadastrado!\nTente novamente.');
    enterInput.value = '';
}

function keepConnection(){
    axios.post('https://mock-api.driven.com.br/api/v4/uol/status', {name:nickName});
}

function sendMessage(){
    const inputMessage = document.querySelector('.write-here');

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

function openSidebar(){
    const bar = document.querySelector('section');
    bar.classList.remove('hide');
}

function closeSidebar(){
    const bar = document.querySelector('section');
    bar.classList.add('hide');
}

function searchUsers(){
    const promise = axios.get('https://mock-api.driven.com.br/api/v4/uol/participants');

}

function reloadPage(){
    window.location.reload();
}

document.addEventListener("keypress", function(e){
	if(e.key === 'Enter'){
		const button = document.querySelector('.message-button');
		button.click();
	}
});
