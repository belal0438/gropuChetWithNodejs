
const socket = io('http://localhost:4000/');

const form = document.getElementById('form-chat');
const formFile = document.getElementById('formElem');
const groupName = JSON.parse(localStorage.getItem('groupName'));

socket.on('connect', () => {
    // console.log(socket.id);
});


socket.on('receive', message => {
    // console.log("message>>>>>>>>>>>>>>>",message);
    Display(message)
})







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
        let chatData = await axios.post('http://localhost:4000/chat/postdata', obj, { headers: { 'Authorization': token } });
        // Display(obj.data)
        socket.emit('send-message', obj.data)

        document.getElementById('my-text').value = "";

    } catch (error) {
        console.log(error)
    }

}


const getchatData = async () => {
    try {
        const token = localStorage.getItem('token');
        let Chatdata = await axios.get('http://localhost:4000/chat/getdata', { headers: { 'Authorization': token } })
        console.log(Chatdata.data);
        document.getElementById('ul-list').innerHTML = "";
        if (Chatdata.data.length >= 0) {
            Chatdata.data.forEach(element => {
                Display(element.data)
            });
        } else {
            return
        }
    } catch (error) {
        console.log(error)
    }

}




window.addEventListener('DOMContentLoaded', async () => {
    getchatData();
})





const getGroupData = async () => {
    try {
        const token = localStorage.getItem('token');
        let groupdata = await axios.get('http://localhost:4000/group/getgroupdata', { headers: { 'Authorization': token } })
        // console.log(groupdata.data.groups);

        groupdata.data.groups.forEach(ele => {
            console.log(ele);
            forDisplayGroups(ele);
        })
    } catch (error) {
        console.log(error)
    }

}
getGroupData();



function forDisplayGroups(obj) {
    const Ul = document.getElementById('Ul-list-groups');
    const li = document.createElement('li')
    const btn = document.createElement('button')

    btn.setAttribute("class", "btn_group")
    li.setAttribute("class", "list-group-item")
    btn.innerText = 'join';
    li.innerText = `${obj.name}`;


    btn.onclick = (eve) => {
        //    console.log(obj)
        localStorage.setItem("groupName", JSON.stringify(obj))
        window.location.href = "../group/group.html";
    }



    li.append(btn);
    Ul.append(li);
}




function Display(obj) {
    const Ul = document.getElementById('ul-list');
    const li = document.createElement('li')
    li.setAttribute("class", "list-group-item")
    li.innerText = `${obj}`;
    Ul.append(li);

}




// window.addEventListener('DOMContentLoaded', async () => {
//     try {
//         const intervalId = setInterval(async () => {
//             const token = localStorage.getItem('token');
//             let Chatdata = await axios.get('http://localhost:4000/chat/getdata', { headers: { 'Authorization': token } })
//             // console.log(Chatdata.data);

//             let arry = new Array();
//             //   console.log(arry);
//             if (Chatdata.data.length > 10) {
//                 let n = Chatdata.data.length - 1;
//                 while (arry.length < 10) {
//                     arry.push((Chatdata.data[n]))
//                     n--
//                 }
//             } else {
//                 arry = Chatdata.data.reverse();
//             }
//             arry = arry.reverse()
//             localStorage.setItem('Array', JSON.stringify(arry));
//             let Arry = JSON.parse(localStorage.getItem('Array'));
//             //   console.log(Arry);

//             document.getElementById('ul-list').innerHTML = "";
//             Arry.forEach(element => {
//                 Display((element.data))
//             });

//         }, 2000)
//         clearInterval(intervalId)

//     } catch (error) {
//         console.log(error);
//     }

// })









formFile.addEventListener('submit', onsubmitfile);

async function onsubmitfile(event) {
    try {
        event.preventDefault();
        formData = new FormData(formFile);

        const token = localStorage.getItem('token');

        console.log("formData>>>>>>>>>>",formData);

        // for (item of formData) {
        //     console.log("item[1]>>>>>>>>>>",item[1]);
        //     console.log("item[1]>File>>>>>>>>>>",item[1].File);
        // }

        const response = await axios.post(`http://localhost:4000/chat/sendfile`, formData, { headers: { 'Authorization': token, "Content-Type": "multipart/form-data" } });

        // console.log(response.data);
        document.getElementById('sendFile').value = null;
        window.location.reload
        //showMyMessageOnScreen(responce.data.data);
    } catch (error) {

        console.log(error);

    }
}
