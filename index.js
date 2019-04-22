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
    if (newUser.name && newUser.bio){
    db
    .insert(newUser)
   .then(user =>{
        res.status(201).json(user);

    })
    .catch(err =>{
        res.status(500).json({error:err, message: "There was an error while saving the user to the database"})
    })
} else {
    res.status(400).json({message:'please provide a name and bio for the user'})
}
})


server.get('/users/:id', (req,res)=>{
    const userId= req.params.id
    db
    .findById(userId)
    .then(user =>{
        if (user){
    res.status(200).json(user)
}else{
    res.status(404).json({message:"The user with the specified ID does not exist."})
}
})
    .catch(err =>{
        res.status(500).json({error:err, message:"The user information could not be retrieved."})
    })

})
server.delete('/users/:id', (req,res)=>{
    const userId= req.params.id
    db
    .remove(userId)
    .then(deleted =>{
        if(deleted){
        res.status(204).end();
        }else{
         res.status(404).json({message:"The user with the specified ID does not exist."})  
        }
    })
    .catch(err =>{
        res.status(500).json({error:err, message:"The user could not be removed"})
    })
})

server.put('/users/:id', (req,res)=>{
    const userId= req.params.id
    const updatedUser=req.body
    console.log('req body:', updatedUser)
    db
    .update(userId,updatedUser)
    .then(user =>{
        if(!user){
            res.status(404).json({message:"The user with the specified ID does not exist."})
        }else if (!user.name && !user.bio){
            res.status(400).json({message:"Please provide name and bio for the user."})
        }else{
        res.status(201).json(user)
        }
      
    })
    .catch(err =>{
        res.status(500).json({error:err, message:'"The user information could not be modified."'})
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