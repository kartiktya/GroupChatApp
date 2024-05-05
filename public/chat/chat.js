var flag1;
//window.addEventListener("DOMContentLoaded",  async () => {

    // flag1 = true;
    
    //setTimeInterval(() => call Api , 1000)
    //setInterval( async() => {

      
        // const token = localStorage.getItem('token');

        // const response1 = await axios.get("http://localhost:3000/user/getUsers", { headers: { 'Authorization': token } });

        // const user1 = await axios.get("http://localhost:3000/user/getUser", { headers: { 'Authorization': token } });
        // //console.log(user1.data.user.id);
        // const userId = user1.data.user.id;

        //const allMessages = await axios.get(`http://localhost:3000/user/getMessages/${userId}`,  { headers: {'Authorization': token} });
        

        const promiseTwo = new Promise(r => {
            setInterval( async() => {
                flag1 = true;
                const token = localStorage.getItem('token');

                 const response1 = await axios.get("http://localhost:3000/user/getUsers", { headers: { 'Authorization': token } });
              r(response1);
            }, 1000);
          });
          promiseTwo.then(x => {
            showActiveUsers(x.data);

            //showAllMessages(x);
            //flag1 = false;
            }); // will resolve once



        const promiseOnce = new Promise(r => {
            setInterval( async() => {
                const token = localStorage.getItem('token');
                const user1 = await axios.get("http://localhost:3000/user/getUser", { headers: { 'Authorization': token } });
                 //console.log(user1.data.user.id);
                const userId = user1.data.user.id;
                const allMessages =  await axios.get(`http://localhost:3000/user/getMessages/${userId}`,  { headers: {'Authorization': token} });
              r(allMessages);
            }, 1000);
          });
          promiseOnce.then(x => {
            //showActiveUsers(response1.data);

            showAllMessages(x);
            flag1 = false;
            }); // will resolve once


        // console.log(allMessages);

        
        // showActiveUsers(response1.data);

        // showAllMessages(allMessages);
        // // flag1 = false;

        // const childToDelete = document.getElementById('activeUsers');
        // const parentElement = childToDelete.parentElement;
        // parentElement.removeChild(childToDelete);
        // console.log(childToDelete.parentElement);


    

//}, 5000 );
//});


function showActiveUsers(data) {

    

    if(flag1) {

    const ul = document.getElementById('activeUsers');
    console.log(ul);

    

    for(let i=0; i<data.user.length; i++) {

        const newLi = document.createElement('li');
        newLi.innerHTML = `${data.user[i].name} joined`;

        ul.appendChild(newLi);

        console.log(data.user[i].name);    

    }



    const token = localStorage.getItem('token');

    axios.get("http://localhost:3000/user/getUser", { headers: { 'Authorization': token } })
    .then((response) => {

        console.log(response.data.user.id);

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

        ul.appendChild(newLi1);


        sendBtn.addEventListener("click", async (event) => { 

            const val = document.getElementById(response.data.user.id).value;

            const userId = response.data.user.id
            const  obj = {
                message: val
            }

            const token = localStorage.getItem('token');
            const newMessage = await axios.post(`http://localhost:3000/user/addMessage/${userId}`, obj, { headers: {'Authorization': token} });

            console.log(newMessage.data.newMessageDetail.message);
            showMessage(newMessage.data.newMessageDetail);




        });

        function showMessage(obj) {
            const newLi2 = document.createElement("li");
           // console.log(obj);
            newLi2.innerHTML = `${response.data.user.name}: ${obj.message}` ;
            
            ul.appendChild(newLi2);
            }




    })
    .catch((err) => console.log(err));
    }
    
}


function showAllMessages(exitingMessages) {

    if(flag1) {
    console.log(exitingMessages.data.allMessages.length);

    for(let i=0; i<exitingMessages.data.allMessages.length; i++) { 

        const newLi2 = document.createElement('li');
        newLi2.innerHTML = `${exitingMessages.data.allMessages[i].userName} :   ${exitingMessages.data.allMessages[i].message}`;

        const ul = document.getElementById('activeUsers');
        ul.appendChild(newLi2);


    }

}

}



