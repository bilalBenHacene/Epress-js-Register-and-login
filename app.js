import express from 'express'
import bcrypt from 'bcrypt'

const app =express();
const port=3000;

const users=[];//use array like a memory database

app.use(express.json());//json midlleware use to send post request data(body)
//express.json()(built-in express) or body-parser package it is the same functionality

app.post("/register",async (req,res)=>{
    //try-catch using when handling data
    try {
        const{email,password}=req.body;
        //find user
        const findUser=users.find((data)=>email==data.email);
        if (findUser) {
            res.status(400).send("Wrong Email or Password!");
        }

        //hash password
        const hashedPassword=  await bcrypt.hash(password,10);//await use to crypting
        users.push({email,password:hashedPassword});
        res.status(201).send("Register Successfully!");//200 or 201 => ok
        
    } catch (error) {
        res.status(500).send({message: error.message});
    };
});


app.post("/login",async (req,res)=>{
    //try-catch using when handling data
    try {
        const{email,password}=req.body;
        //find user
        const findUser=users.find((data)=>email==data.email);
        if (!findUser) {
            res.status(400).send("Wrong Email or Password!");
        }

        //compare hashedpassword
        const passwordMatch=  await bcrypt.compare(password,findUser.password);
        //await use to crypting
        // compare() return boolean

        if(passwordMatch) res.status(200).send("Logged in Successfully!");//200 or 201 => ok
        else  res.status(400).send("Wrong Email or Password!");       
        
    } catch (error) {
        res.status(500).send({message: error.message});
    };
});


app.listen(port,()=>{
    console.log("server is listen :http://localhost/3000");    
})