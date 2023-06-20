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


async function getchatData() {
    const token = localStorage.getItem('token');
    Chatdata = await axios.get('http://localhost:4000/chat/getdata', { headers: { 'Authorization': token } })
    // console.log(Chatdata.data);

    Chatdata.data.forEach(element => {
        Display(element.data)
    });
    
}
getchatData()



function Display(obj) {
    const Ul = document.getElementById('ul-list');
    const li = document.createElement('li')
    li.setAttribute("class", "list-group-item")
    li.innerText = `${obj}`;
    Ul.append(li);

}