let nickName;

let data;

login();

function login(){
    nickName = prompt('Qual o seu lindo nome? ');

    const promise = axios.post('http://mock-api.driven.com.br/api/v4/uol/participants', {name:nickName});
    promise.then(handleSuccess);
    promise.catch(console.log(handleFailure));
}

function handleSuccess(){
    getMessages();
}

function handleFailure(){
    alert('Nome já cadastrado!\nTente novamente.');
    login()
}

function getMessages(){
    const promise = axios.get('http://mock-api.driven.com.br/api/v4/uol/messages');
    promise.then(loadMessages);
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
