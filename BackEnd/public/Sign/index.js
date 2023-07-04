const form = document.getElementById('form-signup');

form.addEventListener('submit', onsubmit)


async function onsubmit(eve) {
    try {
        eve.preventDefault();
        const Name = document.getElementById('my-name');
        const phoneNumber = document.getElementById('my-phone');
        const Email = document.getElementById('my-emial');
        const Password = document.getElementById('my-password')

        const obj = {
            name: Name.value,
            phone: phoneNumber.value,
            email: Email.value,
            password: Password.value
        }
        // console.log(obj);


        let signup = await axios.post('http://54.174.227.103:4000/sign/signup', obj)
        alert(`${signup.data.message}`);

        window.location.href = "../login/index.html";
        
    } catch (error) {
        alert(`${error.response.data.message}`);
        console.log(error);
    }
}


   

