function handleFormSubmit(event) {

    event.preventDefault();

    const name = event.target.name.value;
    const email = event.target.email.value;
    const phone = event.target.phone.value;
    const password = event.target.password.value;

    let userObject = {
        name: name,
        email: email,
        phone: phone,
        password: password
    };

    axios.post("http://localhost:3000/user/signup", userObject)
    .then((response) => {
        //console.log(response);
        
        document.body.innerHTML = document.body.innerHTML + '<h4 style="text-align:center; color:blue;"> Successfully created. You can login now. </h4>'
        window.location.href = '../login/login.html';
    })
    .catch((error)=> {
        document.body.innerHTML = document.body.innerHTML + '<h4 style="text-align:center; color:red;"> Something went wrong </h4>'
        console.log(error);
     });
}

