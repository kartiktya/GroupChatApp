window.addEventListener("DOMContentLoaded",  async () => {


    const token = localStorage.getItem('token');

    const response1 = await axios.get("http://localhost:3000/user/getUser", { headers: { 'Authorization': token } })
    //.then((response1) => {
        console.log(response1);

        showActiveUsers(response1.data);

    //})
    //.catch((err) => console.log(err));

} );


function showActiveUsers(data) {

    const ul = document.getElementById('activeUsers');
    console.log(ul);

    

    for(let i=0; i<data.user.length; i++) {

        const newLi = document.createElement('li');
        newLi.innerHTML = `${data.user[i].name} joined`;

        ul.appendChild(newLi);

        console.log(data.user[i].name);    

    }

}


