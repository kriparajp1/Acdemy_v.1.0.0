const express =require('express')
const path = require("path")
const bcrypt =require("bcrypt")
const collection =require("./config")
const ejs=require("ejs");
const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.set('view engine', 'ejs')
// Correct the views directory path
app.set('views', path.join(__dirname, 'views'));
 
app.use(express.static('public'))
app.set('public', path.join(__dirname, 'public'));
//-----------------home page ----------------


app.get("/",(req,res)=>{
    res.render("login")
})
app.get("/signup",(req,res)=>{
    res.render("signup")
})

//---------User SignUp----------
app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.name,
       email: req.body.email,
       password: req.body.password
    };
 
    try {
       // Check if the user already exists
       const existingUser = await collection.findOne({ email: data.email });
       if (existingUser) {
          return res.send("User already registered");
       }
 
       // Hash the password
       const saltRounds = 10;
       const hashedPassword = await bcrypt.hash(data.password, saltRounds);
       data.password = hashedPassword;
 
       // Create a new user
       const newUser = await collection.create(data);
       console.log(newUser);
       res.redirect("/")
    } catch (error) {
       console.error(error);
       res.status(500).send("Internal Server Error");
    }
 });

 
//------------------ login ----------------------
app.post( "/login" ,async (req, res) => {
    try{
        const check =await collection.findOne({name:req.body.username})
        if(!check){
            res.send("user cannot find")
        }
    const isPasswordMatch=await bcrypt.compare(req.body.password,check.password)
        if(isPasswordMatch){
            res.render("home")
        }else{
            res.send("wrong Details")
        }
    }
    catch{
        res.send('wrong details')
    }
})


const port =5000
app.listen(port,()=>{
    console.log( `Server is running on ${port}`)
})