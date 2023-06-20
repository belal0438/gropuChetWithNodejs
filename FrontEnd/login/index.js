
const form  = document.getElementById('form-logingnup');

form.addEventListener('submit', onsubmit)

 async function onsubmit(eve){
   try {
      eve.preventDefault()
      const email = document.getElementById('my-emial');
      const password = document.getElementById('my-password');
     
      const obj = {
         email: email.value,
         password: password.value
      }
     //  console.log(obj);
     let loginData = await axios.post('http://localhost:4000/login/login', obj)
     alert(`${loginData.data.message}`)

     localStorage.setItem('token',loginData.data.token)

     window.location.href = "../ChatApp/index.html";
     
   } catch (error) {
      alert(`${error.response.data.message}`);
      console.log(error)
   }
}