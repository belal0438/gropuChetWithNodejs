const form = document.getElementById('form-signup');

form.addEventListener('submit', onsubmit)

function onsubmit(eve) {
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

    console.log(obj);

}