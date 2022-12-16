//const axios = require('axios').default;
//import axios from "axios";
//require not defined and there is no package.json file to dfine type:module so import wont work



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

axios({
    method: 'get',
    url: '/minions',
    baseURL: 'https://ffxiv-collectables.onrender.com/'
}).then((response)=>{
    console.log(response.data)
})
//can use object key (transfromRequest) to transform the request data
// similar with (transformResponse) but for res data