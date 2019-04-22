// implement your API here
const express = require('express');
const db = require('./data/db.js')

const server = express();
server.use(express.json())

server.get('/',(req,res)=>{
res.send('Hello World!');
});

server.get('/users', (req,res) =>{
    db
    .find()
    .then(users =>{
        res.status(200).json(users)
    })
    .catch(err =>{
        res.json({error:err, message: "The users information could not be retrieved." })
    })
})

server.post('/users', (req,res)=>{
    const newUser =req.body;
    console.log('req body:', newUser)
    db
    .insert(newUser)
    .then(user =>{
        res.status(201).json(user);
    })
    .catch(err =>{
        res.status(500).json({error:err, message: "There was an error while saving the user to the database"})
    })
})

server.get('/users/:id', (req,res)=>{
    const userId= req.params.id
    db
    .findById(userId)
    .then(user =>{
    res.status(200).json(user)
    })
    .catch(err =>{
        res.status(500).json({error:err, message:"The user information could not be retrieved."})
    })

})

// server.get('/hobbits', (req,res)=>{
// const hobbits =[
//     {
//         id:1,
//         name:'Samwise Gamgee'
//     },
//     {
//         id:2,
//         name:'Frodo Baggins'
//     }
// ]
// res.status(200).json(hobbits);
// });



server.listen(8000, () => console.log('API running on port 8000'));