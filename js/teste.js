let nickName;

let data;

login();

function login(){
    nickName = prompt('Qual o seu lindo nome? ');

    const promise = axios.post('http://mock-api.driven.com.br/api/v4/uol/participants', {name:nickName});
    promise.then(handleSuccess);
    promise.catch(handleFailure);
}

function handleSuccess(){
    getMessages();
}

function handleFailure(){
    alert('Nome já cadastrado!\nTente novamente.');
    login()
}

function getMessages(){
    
    const promise = axios.get('https://mock-api.driven.com.br/api/v4/uol/messages');
    promise.then(loadMessages);
    promise.catch(handleFailure);
}

function handleFailure(){
    alert('coisou');
}

function loadMessages(response){
    const chatMessages = document.querySelector('.messages-list');
    chatMessages.innerHTML = '';

    data = response.data;

    
    for(let i = 0; i < data.length; i++){
        
        let from = resposta.data[i].from;
        let to = resposta.data[i].to;
        let text = resposta.data[i].text;
        let time = resposta.data[i].time;

        if(data[i] === 'status'){
            chatMessages.innerHTML += `
            <li class="message">
                <p class="status" data-identifier="message">
                    <span class="time">(${time})</span>
                    <span class="fromTo">${from}</span>${text}
                </p>
            </li>
            `
        }else if(data[i] === 'message'){
            chatMessages.innerHTML += `
            <li class="message">
                <p class="normal" data-identifier="message">
                    <span class="time">(${time})</span>
                    <span class="fromTo">${from}</span>para 
                    <span class="fromTo">${to}:</span>${text}
                </p>
            </li>
            `
        }else if(data[i].type === "private_message" && data[i].to === nickName){
            chatMessages.innerHTML += `
            <li class="message">
                <p class="private" data-identifier="message">
                    <span class="time">(${time})</span>
                    <span class="fromTo">${from}</span>reservadamente para
                    <span class="fromTo">${to}:</span>: ${text}
                </p>
            </li>
            `
        }
    }

}

function sendMessage(){
    const inputMessage = document.querySelector('input');

    const promise = axios.post('http://mock-api.driven.com.br/api/v4/uol/messages',
        {
            from: `${nickName}`,
            to: "Todos",
            text: inputMessage.value,
            type: "message"
          }
    )

    inputMessage.value = '';

    promise.then(loadMessages);
    promise.catch(reloadPage);
}

function reloadPage(){
    window.location.reload(); 
}

function scrollToTheEnd(){
    const lastMessage = document.querySelector('');
    lastMessage.scrollIntoView();
}


document.addEventListener("keypress", function(e){
	if(e.key === 'Enter'){
		const button = document.querySelector("#submit");
		button.click();
	}
});

