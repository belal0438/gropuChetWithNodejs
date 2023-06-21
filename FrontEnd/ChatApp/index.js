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

    // Display(obj.data)
    getchatData(obj.data)

    document.getElementById('my-text').value = "";
}


const getchatData = async () => {
    const token = localStorage.getItem('token');
    let Chatdata = await axios.get('http://localhost:4000/chat/getdata', { headers: { 'Authorization': token }})
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



window.addEventListener('DOMContentLoaded', async () => {
    const intervalId = setInterval(async () => {
        const token = localStorage.getItem('token');
        let Chatdata = await axios.get('http://localhost:4000/chat/getdata', { headers: { 'Authorization': token } })
        // console.log(Chatdata.data);

        let arry = new Array();
        //   console.log(arry);
        if (Chatdata.data.length > 10) {
            let n = Chatdata.data.length - 1;
            while (arry.length < 10) {
                arry.push((Chatdata.data[n]))
                n--
            }
        } else {
            arry = Chatdata.data.reverse();
        }
        arry = arry.reverse()
        localStorage.setItem('Array', JSON.stringify(arry));
        let Arry = JSON.parse(localStorage.getItem('Array'));
        //   console.log(Arry);

        document.getElementById('ul-list').innerHTML = "";
        Arry.forEach(element => {
            Display((element.data))
        });

    }, 2000)
    clearInterval(intervalId)
})






function Display(obj) {
    const Ul = document.getElementById('ul-list');
    const li = document.createElement('li')
    li.setAttribute("class", "list-group-item")
    li.innerText = `${obj}`;
    Ul.append(li);

}