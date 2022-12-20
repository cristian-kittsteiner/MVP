






let form = document.getElementById('search');
let button = document.getElementById('button');
let footer = document.querySelector('footer');
let listButton = document.getElementById('list');
let myTable = document.getElementById('minion_list');
let searchResult = document.createElement("div");
let newButton = document.createElement('button');
let newPic = document.createElement('img');

newButton.id ='add';
newButton.innerText = "Add";

let searchValue = form.value;

let crudFunc = {
     async searchMinion() {
        let minion = await axios.get('https://ffxivcollect.com/api/minions', {
            params:{
                name_en_start: searchValue
            }
        })
        return minion
    }
}


button.addEventListener("click", () => {
    searchValue = form.value;
        crudFunc.searchMinion().then((response)=>{
        let minionName = response.data.results[0].name
        let picture = response.data.results[0].image
        console.log(response.data)
        searchResult.innerText = minionName + " " + minionName
        newPic.src = picture;
        footer.append(searchResult);
        footer.append(newPic);
        footer.append(newButton);
                })
            });

newButton.addEventListener("click", () =>{
    crudFunc.searchMinion().then((response)=>{
    let minionName = response.data.results[0].name
    let minionLoc = response.data.results[0].sources[0].type + ' ' + response.data.results[0].sources[0].text;
        axios.post('http://localhost:3000/minions', {
            name: minionName,
            owns: false,
            location: minionLoc
        })
        alert(`Added ${minionName} to your Collection`)
    })
})

listButton.onclick = function() {
    axios.get('http://localhost:3000/minions').then((response) =>{
        if(myTable.rows.length !== response.data.length || myTable.rows.length <= response.data.length ){
            myTable.innerText = "";
            for (let i = 0; i < response.data.length; i++) {
                let minion = response.data[i];
                let { name, owns, location } = minion;
                let checkbox = document.createElement('input');
                checkbox.id = `checkbox${i}`
                checkbox.type = 'checkbox'
                checkbox.value = owns;
                checkbox.addEventListener('change', () => {
                    if(response.data[i].owns === true){
                        axios.patch(`http://localhost:3000/minions/${response.data[i].id}`,{
                            owns: false
                        })
                    } else {
                        axios.patch(`http://localhost:3000/minions/${response.data[i].id}`,{
                            owns: true
                        })
                    }
                })
                let deleteButton = document.createElement('button')
                deleteButton.id = `button${i}`
                deleteButton.type = 'button'
                deleteButton.innerText = "delete"
                deleteButton.addEventListener('click', ()=>{
                    if(confirm(`Are you sure you want to remove ${name}?`) == true){
                        axios.delete(`http://localhost:3000/minions/${response.data[i].id}`)
                    }
                })
                let row = myTable.insertRow(-1);
                row.insertCell(0).append(deleteButton);
                row.insertCell(1).innerText = name;
                row.insertCell(2).innerText = location;
                row.insertCell(3).innerText = owns;
                row.insertCell(4).append(checkbox);
            }
    myTable.createTHead();
    let tableHeader = myTable.tHead.insertRow(0);
    tableHeader.insertCell(0).innerText = '';
    tableHeader.insertCell(1).innerText = 'Name';
    tableHeader.insertCell(2).innerText = 'Location'; 
    tableHeader.insertCell(3).innerText = 'Owns';
        }
    }) 
}




// checkbox.onclick = function () {

// }

//form.addEventListener('submit', logValue());



//const axios = require('axios').default;
//import axios from "axios";
//require not defined and there is no package.json file to dfine type:module so import wont work



// Make sure you write your CRUD routes in Axios here and in routes.js
// make sure they match and provide proper responses before pushing to github

// fetch("https://ffxiv-collectables.onrender.com/minions")
//     .then((res) => res.json())
//     .then((data) => {
//         console.log(data)
//     });

// axios({
//     method: 'get',
//     url: '/minions',
//     baseURL: 'http://localhost:3000/'
// }).then((response)=>{
//     console.log(response.data)
// });

// the above code and below code do the same thing

axios.get('http://localhost:3000/minions').then((res) => {
    console.log(res.data)
})

axios.get('https://ffxivcollect.com/api/minions/1').then((response)=>{
    console.log((response.data)) // gets name
    console.log((response.data.id))  // gets id
    console.log((response.data.image)) // gets image
})


// axios.get('https://ffxivcollect.com/api/minions', {
//     params:{
//         name_en_start: searchValue
//     }
// }).then((response)=>{ 
//    console.log(response.data.results[0])
// })
// axios({
//     method: 'get',
//     url: '/minions',
//     baseURL: 'https://ffxiv-collectables.onrender.com/'
// }).then((response)=>{
//     console.log(response.data)
// })
//can use object key (transfromRequest) to transform the request data
// similar with (transformResponse) but for res data