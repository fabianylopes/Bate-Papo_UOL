
let nickName;

let info;

login();

function login(){
    nickName = prompt('Qual o seu lindo nome? ');

    const promise = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', {name:nickName});
    promise.then(getMessages);
    promise.catch(handleFailure);
}

function handleFailure(){
    alert('Nome já cadastrado!\nTente novamente.');
    login();
}


function getMessages(){

    const promise = axios.get('https://mock-api.driven.com.br/api/v4/uol/messages');
    promise.then(loadMessages);
    promise.catch(fail);

}

//setInterval(loadMessages, 3000);

function loadMessages(response){
    
    info = response.data;

    const chatMessages = document.querySelector('.messages-list');
    chatMessages.innerHTML = '';

    for(let i = 0; i < info.length; i++){

        if(info[i].type = 'status'){
            chatMessages.innerHTML += `
            <li class="message">
                <p class="status" data-identifier="message">
                    <span class="time">(${info[i].time})</span>
                    <span class="fromTo">${info[i].from}</span>${info[i].text}
                </p>
            </li>
            `
        }else if(info[i] === 'message'){
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
                    <span class="fromTo">${to}:</span>: ${text}
                </p>
            </li>
            `
        }
    }
}

function fail(error){
    console.log(error);
}

//setInterval(keepConnection, 5000);



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
		const button = document.querySelector("#submit");
		button.click();
	}
});
