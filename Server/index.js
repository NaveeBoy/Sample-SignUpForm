const express = require('express');
const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

require('./db/connection');
const Users = require('./Models/User');



app.post("/",async(req,res)=>{
    let user = new Users(req.body);
    let result = await user.save();
    res.send(result);
})

app.listen(4000);
