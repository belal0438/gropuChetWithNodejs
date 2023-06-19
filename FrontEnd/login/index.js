
const form  = document.getElementById('form-logingnup');

form.addEventListener('submit', onsubmit)

function onsubmit(eve){
    eve.preventDefault()
 const email = document.getElementById('my-emial');
 const password = document.getElementById('my-password');

 const obj = {
    email: email.value,
    password: password.value
 }

 console.log(obj);

}