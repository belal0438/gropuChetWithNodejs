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
    let chatData = await axios.post('http://localhost:4000/chat/postdata', obj, { headers: { 'Authorization': token } });

    Display(obj.data)

    document.getElementById('my-text').value = "";
}


const getchatData = async () => {
    const token = localStorage.getItem('token');
    let Chatdata = await axios.get('http://localhost:4000/chat/getdata', { headers: { 'Authorization': token }, Credential:"include" })
    // console.log(Chatdata.data);
    document.getElementById('ul-list').innerHTML = "";
    if (Chatdata.data.length >= 0) {
        Chatdata.data.forEach(element => {
            Display(element.data)
        });
    } else {
        return
    }
}
getchatData()
// setInterval(() => getchatData(), 1000)



function Display(obj) {
    const Ul = document.getElementById('ul-list');
    const li = document.createElement('li')
    li.setAttribute("class", "list-group-item")
    li.innerText = `${obj}`;
    Ul.append(li);

}