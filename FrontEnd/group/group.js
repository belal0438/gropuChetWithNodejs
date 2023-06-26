
const grpname = document.getElementById('grpname');
const groupName = JSON.parse(localStorage.getItem('groupName'));
 console.log(groupName);
grpname.innerHTML = `${groupName.name}`;





const form = document.getElementById('form-chat1');


const getGroupchatData = async () => {
    try {
        const token = localStorage.getItem('token');
        let Chatdata = await axios.get(`http://localhost:4000/group/getdata/${groupName.id}`, { headers: { 'Authorization': token } })
        // console.log(Chatdata.data);
        document.getElementById('ul-list1').innerHTML = "";
        if (Chatdata.data.length >= 0) {
            Chatdata.data.forEach(element => {
                GroupChatDisplay(element.data)
            });
        } else {
            return
        }
    } catch (error) {
        console.log(error)
    }

}

getGroupchatData();


form.addEventListener('submit', onsubmit);
async function onsubmit(eve) {
    try {
        eve.preventDefault();
        const data = document.getElementById('my-text');

        let obj = {
            data: data.value
        }
        // console.log(obj);
        const token = localStorage.getItem('token');
        let chatData = await axios.post(`http://localhost:4000/group/postdata/${groupName.id}`, obj, { headers: { 'Authorization': token } });
        // GroupChatDisplay(obj.data)
        getGroupchatData(obj.data)
        // console.log(chatData)
        document.getElementById('my-text').value = "";

    } catch (error) {
        console.log(error)
    }

}




function GroupChatDisplay(obj) {
    const Ul = document.getElementById('ul-list1');
    const li = document.createElement('li')
    li.setAttribute("class", "list-group-item")
    li.innerText = `${obj}`;
    Ul.append(li);

}


const form2 = document.getElementById('form-chat2');

form2.addEventListener('submit', onSubmitEmail);
async function onSubmitEmail(eve) {
    try {
        eve.preventDefault();
        const Emaildata = document.getElementById('my-email');

        let obj = {
            email: Emaildata.value
        }
        // console.log(obj);
        const token = localStorage.getItem('token');
        let chatData = await axios.post(`http://localhost:4000/group/postgroupmember/${groupName.id}`, obj, { headers: { 'Authorization': token } });
        // getGroupchatData(obj.data)
        // console.log(chatData)
        document.getElementById('my-email').value = "";

    } catch (error) {
        console.log(error)
    }

}


const getGroupUserData = async () => {
    try {
        const token = localStorage.getItem('token');
        let GroupUserdata = await axios.get(`http://localhost:4000/group/getgroupmember/${groupName.id}`, { headers: { 'Authorization': token } })
        // console.log(GroupUserdata.data.message);
        document.getElementById('ul-list2').innerHTML = "";
        if (GroupUserdata.data.message.length >= 0) {
            GroupUserdata.data.message.forEach(element => {
                GroupUserDisplay(element.name)
            });
        } else {
            return
        }
    } catch (error) {
        console.log(error)
    }

}

getGroupUserData();


function GroupUserDisplay(obj) {
    const Ul = document.getElementById('ul-list2');
    const li = document.createElement('li');
    const btn = document.createElement('button')
    li.setAttribute("class", "list-group-item");
    btn.setAttribute("class", "btn_group")
    btn.innerText = 'remove';
    li.innerText = `${obj}`;

    li.append(btn);
    Ul.append(li);

}
