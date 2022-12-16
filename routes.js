import express from "express";
import postgres from "postgres"; 

let sql = postgres("postgres://ffxiv_collectables_user:NmvvR0ExfRM7CT0Bz2aFwa4RthUrL20j@dpg-ceecv29gp3jlc78tipe0-a.oregon-postgres.render.com/ffxiv_collectables?ssl=true");
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