window.addEventListener("DOMContentLoaded",  async () => { 


        // const token = localStorage.getItem('token');

        // const response1 = await axios.get("http://localhost:3000/user/getUsers", { headers: { 'Authorization': token } });


        //const allMessages = await axios.get(`http://localhost:3000/user/getMessages`,  { headers: {'Authorization': token} });
        
        

            showActiveUsers();

            showAllMessages();

        
        


});

 const showActiveUsers =  async () => {

    console.log(111111111);
    const token = localStorage.getItem('token');

    const response1 = await axios.get("http://localhost:3000/user/getUsers", { headers: { 'Authorization': token } });

    for(let i=0; i<response1.data.user.length; i++) {

        const newLi = document.createElement('li');
        newLi.innerHTML = `${response1.data.user[i].name} joined`;

        const ul = document.getElementById('activeUsers');

        ul.appendChild(newLi);

    }
    showInputText();

};

const showInputText =  async () => {

    const token = localStorage.getItem('token');

    const response = await axios.get("http://localhost:3000/user/getUser", { headers: { 'Authorization': token } });

    
    const newLi1 = document.createElement('li');
    const newInput = document.createElement('input');
    const sendBtn = document.createElement("button");

    newLi1.innerHTML = `${response.data.user.name}:`;

    sendBtn.setAttribute("class","btn btn-primary");
    newInput.setAttribute('type', 'text');
    newInput.setAttribute('id', response.data.user.id);

    sendBtn.textContent = "Send";

    newLi1.appendChild(newInput);
    newLi1.appendChild(sendBtn);

    const ul = document.getElementById('messageSendArea');

    ul.appendChild(newLi1);


    
    sendBtn.addEventListener("click", async (event) => { 

        const val = document.getElementById(response.data.user.id).value;

        const userId = response.data.user.id
        const  obj = {
            message: val
        }

        const token = localStorage.getItem('token');
        const newMessage = await axios.post(`http://localhost:3000/user/addMessage/${userId}`, obj, { headers: {'Authorization': token} });

        //console.log(newMessage.data.newMessageDetail.message);
        showMessage(newMessage);

    });

};

function showMessage(newMessage) {

    const newLi2 = document.createElement("li");
    
    newLi2.innerHTML = `${newMessage.data.newMessageDetail.userName}: ${newMessage.data.newMessageDetail.message}` ;
    
    const ul = document.getElementById('activeUsers');
    
    ul.appendChild(newLi2);

    document.getElementById(`${newMessage.data.newMessageDetail.userId}`).value = '';
}


const showAllMessages = async () => { 

    const token = localStorage.getItem('token');
    const exitingMessages = await axios.get(`http://localhost:3000/user/getMessages`,  { headers: {'Authorization': token} });

    localStorage.setItem('message',  JSON.stringify(exitingMessages));

    const msg = JSON.parse(localStorage.getItem('message'));
    console.log(212336);
    //const msg = JSON.parse(msg)
    console.log(msg.data);

    for(let i=0; i<msg.data.allMessages.length; i++) { 

        const newLi2 = document.createElement('li');
        newLi2.innerHTML = `${msg.data.allMessages[i].userName} :   ${msg.data.allMessages[i].message}`;

        const ul = document.getElementById('activeUsers');
        ul.appendChild(newLi2);


    }

};