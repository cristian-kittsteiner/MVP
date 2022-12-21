let form = document.getElementById('search');
let button = document.getElementById('button');
let divEight = document.querySelector('#div8');
let listButton = document.getElementById('list');
let myTable = document.querySelector('.minion_list');
let searchResult = document.createElement("div");
let newButton = document.createElement('button');
let newPic = document.createElement('img');
let br = document.createElement('br');


newButton.id ='add';
newButton.title ='Add Minion'

let searchValue = form.value;

let search = {
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
        search.searchMinion().then((response)=>{
        let minionName = response.data.results[0].name;
        let minionDes = response.data.results[0].description;
        let picture = response.data.results[0].image
        console.log(response.data)
        searchResult.innerText = minionName + "\n" + "\n" + minionDes;
        newPic.src = picture;
        divEight.append(newPic);
        divEight.append(searchResult);
        divEight.append(newButton);
                })
            });

newButton.addEventListener("click", () =>{
    search.searchMinion().then((response)=>{
    let minionName = response.data.results[0].name
    let minionLoc = response.data.results[0].sources[0].type + ' ' + response.data.results[0].sources[0].text;
        axios.post('https://ffxiv-collectables.onrender.com/minions', {
            name: minionName,
            owns: false,
            location: minionLoc
        })
        alert(`Added ${minionName} to your Collection`)
    })
})


listButton.onclick = function() {
    axios.get('https://ffxiv-collectables.onrender.com/minions').then((response) =>{
        if(myTable.rows.length !== response.data.length || myTable.rows.length <= response.data.length ){
            myTable.innerText = "";
            for (let i = 0; i < response.data.length; i++) {
                let minion = response.data[i];
                let { name, owns, location } = minion;
                let checkbox = document.createElement('input');
                checkbox.id = `checkbox${i}`
                checkbox.className = 'checker'
                checkbox.type = 'checkbox'
                checkbox.value = owns;
                checkbox.addEventListener('change', () => {
                    if(response.data[i].owns === true){
                        axios.patch(`https://ffxiv-collectables.onrender.com/minions/${response.data[i].id}`,{
                            owns: false
                        })
                    } else {
                        axios.patch(`https://ffxiv-collectables.onrender.com/minions/${response.data[i].id}`,{
                            owns: true
                        })
                    }
                })
                let deleteButton = document.createElement('button')
                deleteButton.id = `button${i}`
                deleteButton.className = 'delete';
                deleteButton.type = 'button';
                deleteButton.addEventListener('click', ()=>{
                    if(confirm(`Are you sure you want to remove ${name}?`) == true){
                        axios.delete(`https://ffxiv-collectables.onrender.com/minions/${response.data[i].id}`)
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



let modal = document.getElementById("myModal");


let btn = document.getElementById("modalBtn");


let span = document.getElementsByClassName("close")[0];


btn.onclick = function() {
  modal.style.display = "block";
}


span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


axios.get('https://ffxiv-collectables.onrender.com/minions').then((res) => {
    console.log(res.data)
})

axios.get('https://ffxivcollect.com/api/minions/1').then((response)=>{
    console.log((response.data)) // gets name
    console.log((response.data.id))  // gets id
    console.log((response.data.image)) // gets image
})
