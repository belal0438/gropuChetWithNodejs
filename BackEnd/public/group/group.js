
const grpname = document.getElementById('grpname');
const groupName = JSON.parse(localStorage.getItem('groupName'));
console.log(groupName);
grpname.innerHTML = `${groupName.name}`;





const form = document.getElementById('form-chat1');


const getGroupchatData = async () => {
    try {
        const token = localStorage.getItem('token');
        let Chatdata = await axios.get(`http://54.174.227.103:4000/group/getdata/${groupName.id}`, { headers: { 'Authorization': token } })
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
        // console.log(error)
        alert(`${error.response.data.message}`)
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
        let chatData = await axios.post(`http://54.174.227.103:4000/group/postdata/${groupName.id}`, obj, { headers: { 'Authorization': token } });
        // GroupChatDisplay(obj.data)
        getGroupchatData(obj.data)
        // console.log(chatData)
        document.getElementById('my-text').value = "";

    } catch (error) {
        // console.log(error)
        alert(`${error.response.data.message}`)
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
        let chatData = await axios.post(`http://54.174.227.103:4000/group/postgroupmember/${groupName.id}`, obj, { headers: { 'Authorization': token } });
        // getGroupchatData(obj.data)
        // console.log(chatData)
        document.getElementById('my-email').value = "";
        getGroupUserData();
    } catch (error) {
        alert(`${error.response.data.message}`)
    }

}


const getGroupUserData = async () => {
    try {
        const token = localStorage.getItem('token');
        let GroupUserdata = await axios.get(`http://54.174.227.103:4000/group/getgroupmember/${groupName.id}`, { headers: { 'Authorization': token } })
        // console.log(GroupUserdata.data.message);
        document.getElementById('ul-list2').innerHTML = "";
        // console.log(GroupUserdata.data);
        if (GroupUserdata.data.message.length >= 0) {
            GroupUserdata.data.message.forEach(element => {
                if (element.isAdmin == true) {
                    GroupUserWithAdminDisplay(element.name, element.email)
                } else {
                    GroupUserDisplay(element.name, element.email)
                }
            });
        } else {
            return
        }
    } catch (error) {
        // console.log(error)
        alert(`${error.response.data.message}`)
    }

}

getGroupUserData();


function GroupUserDisplay(obj, email) {
    try {
        const Ul = document.getElementById('ul-list2');
        const li = document.createElement('li');
        const btn = document.createElement('button')
        li.setAttribute("class", "list-group-item");
        btn.setAttribute("class", "btn_group")
        btn.innerText = 'remove';
        li.innerText = `${obj}`;

        const token = localStorage.getItem('token');

        btn.onclick = async (eve) => {
            // console.log(email)
            let obj = { email: email }
            let chatData = await axios.post(`http://54.174.227.103:4000/group/deletegroupmember/${groupName.id}`, obj, { headers: { 'Authorization': token } });
            getGroupUserData();
        }

        li.append(btn);
        Ul.append(li);

    } catch (error) {
        alert(`${error.response.data.message}`)

    }

}


function GroupUserWithAdminDisplay(obj, email) {
    try {
        const Ul = document.getElementById('ul-list2');
        const li = document.createElement('li');
        const btn = document.createElement('button')
        const p = document.createElement('p')
        const Adminbtn = document.createElement('button')

        Adminbtn.setAttribute("class", "btn_group")
        li.setAttribute("class", "list-group-item");
        btn.setAttribute("class", "btn_group")
        p.setAttribute("class", "para")

        Adminbtn.innerText = `removeAdmin`;
        btn.innerText = 'remove';
        li.innerText = `${obj}`;
        p.innerHTML = " Admin "


        const token = localStorage.getItem('token');

        btn.onclick = async (eve) => {
            // console.log(email)
            let obj = { email: email }
            let chatData = await axios.post(`http://54.174.227.103:4000/group/deletegroupmember/${groupName.id}`, obj, { headers: { 'Authorization': token } });
            getGroupUserData();
        }


        Adminbtn.onclick = async (eve) => {
            // console.log(email)
            let obj = { email: email }
            let chatData = await axios.post(`http://54.174.227.103:4000/admin/deletegroupadmin/${groupName.id}`, obj, { headers: { 'Authorization': token } });
            getGroupUserData();
        }
        li.append(p);
        li.append(btn);
        li.append(Adminbtn);
        Ul.append(li);

    } catch (error) {
        alert(`${error.response.data.message}`)
    }


}








const form_Admin = document.getElementById('form-Admin');
form_Admin.addEventListener('submit', onsubmitAdmin);


async function onsubmitAdmin(eve) {

    try {
        eve.preventDefault();
        const AdminEmail = document.getElementById('Admin');

        let obj = {
            email: AdminEmail.value
        }
        // console.log(obj);
        const token = localStorage.getItem('token');
        let chatData = await axios.post(`http://54.174.227.103:4000/admin/postgroupamin/${groupName.id}`, obj, { headers: { 'Authorization': token } });
        // console.log(chatData)
        document.getElementById('Admin').value = "";
        getGroupUserData();

    } catch (error) {
        alert(`${error.response.data.message}`)
    }

}