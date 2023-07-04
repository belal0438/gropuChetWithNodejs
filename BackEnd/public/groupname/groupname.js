
const form_group_name = document.getElementById('form-groupname');

form_group_name.addEventListener('submit', onSubmit);

async function onSubmit(eve) {
    eve.preventDefault();

    const group_name = document.getElementById('grp-name');

    const obj = {
        groupName: group_name.value
    }

    // console.log(obj);
    const token = localStorage.getItem('token');
    let chatData = await axios.post('http://54.174.227.103:4000/group/creategroupdata', obj, { headers: { 'Authorization': token } });

    //    console.log(chatData);

    localStorage.setItem("groupName", JSON.stringify(chatData.data))

    window.location.href = "../group/group.html";
}


const getGroupData = async () => {
    try {
        const token = localStorage.getItem('token');
        let groupdata = await axios.get('http://54.174.227.103:4000/group/getgroupdata', { headers: { 'Authorization': token } })
        // console.log(groupdata.data.groups);

        groupdata.data.groups.forEach(ele => {
            //  console.log(ele);
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

