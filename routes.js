import express, { json } from "express";
import postgres from "postgres"; 


let sql = postgres({
    database : 'ffxiv',
    password : '0'
})

// ({database : 'ffxiv',password : '0'})
// use below when trying to access server, use above when trying to test on localhost
//("postgres://ffxiv_collectables_user:NmvvR0ExfRM7CT0Bz2aFwa4RthUrL20j@dpg-ceecv29gp3jlc78tipe0-a.oregon-postgres.render.com/ffxiv_collectables?ssl=true");
//'?ssl=true'
let app = express();
app.use(express.json());
app.use(express.static("./public"));

app.get('/minions', async (req, res) => {
    let minionsList = await sql`SELECT * FROM minions`;
    res.send( minionsList)
})

app.get('/minions/:id', async (req, res) => {
    let id = req.params.id;
    let minion = await sql `SELECT * FROM minions`;
    if (minion.length === 0){
        res.status(404).set('Content-Type', 'text/plain').send('Not Found')
    } else{
    res.send(minion[id])
    }
})

app.post('/minions' , async (req, res) => {
    let minion = req.body;
    let {name, owns, location } = minion;
    res.send(await sql`INSERT INTO minions 
        (name, owns, location) 
        VALUES
        (${name}, false,${location}) 
        RETURNING name, owns, location;`)
})

app.patch('/minions/:id' , async (req, res) => {
    let id = req.params.id;
    let minion = req.body
    res.send( await sql 
    `UPDATE minions 
    SET ${sql(minion)}
    WHERE id = ${id} RETURNING *`)
})

app.delete('/minions/:id', async (req, res) =>{
    let id = req.params.id
    res.send( await sql `
    DELETE FROM minions 
    WHERE id = ${id} RETURNING *`)
})

// next line will be to get minions by name, using the value that the user puts in the input box. 
     
// ensure you change the url to API/MINIONS eventually, its good practice

// app.get for index or id.
// app.post 

app.listen(3000, function(){
    console.log('server is running')
})