import express from "express";
import postgres from "postgres"; 

let sql = postgres({
    database: 'ffxiv',
    password: "0"
});
//'?ssl=true'
let app = express();
app.use(express.json());
app.use(express.static("./public"));

app.get('/minions', async (req, res) => {
    res.send( await sql`SELECT * FROM minions`)
})

// ensure you change the url to API/MINIONS eventually, its good practice

// app.get for index or id.
// app.post 

app.listen(3000, function(){
    console.log('server is running')
})