function handleForgotPasswordSubmit(event) {

    event.preventDefault();

    const email = event.target.email.value;

    //const token = localStorage.getItem('token');
    axios.post('http://localhost:3000/password/forgotPassword', {email})
    .then((response) => {
        console.log(response);
    })
    .catch((err) => {
        console.log(err);
    });

}