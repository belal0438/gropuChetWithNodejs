const form = document.getElementById('form-chat');

form.addEventListener('submit', onsubmit);

async function onsubmit(eve) {
    eve.preventDefault();

    const data = document.getElementById('my-text');

    let obj = {
        data: data.value
    }
    // console.log(obj);
    const token = localStorage.getItem('token');
    let chatData = await axios.post('http://localhost:4000/chat/chatdata', obj, { headers: { 'Authorization': token } })

    document.getElementById('my-text').value = "";

}