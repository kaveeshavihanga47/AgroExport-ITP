const express = require("express");
const router = express.Router();
const User = require("../../models/User/UserModel.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// Assuming JWT_SECRET is imported or defined here
const JWT_SECRET = "secret"; // Change this to load from environment variables in prod


router.post("/",async (req,res)=>{
    const {name,nic,email,password, role} = req.body
    const user = await User.findOne({email})

    if(user){
        return res.json({message:"User already exists"})
    }

    const hashPassword = await bcrypt.hash(password,10)
    const newUser = new User({
        
        name,
        email,
        nic,
        password:hashPassword,
        role
    })

    newUser.save()
    return res.json({message:"User created successfully"})
})

router.get("/", async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users from the database
        return res.status(200).json({
            data: users
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
});

router.get("/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        return res.status(200).json({
            data: user
        })
    }catch(err){
        console.log(err.message)
        res.status(500).send({message: err.message})
    }
})

router.delete('/:id', async(req,res)=>{ //delete user

    try{

        const {id} = req.params;
        const result = await User.findByIdAndDelete(id)

        if(!result){
            return res.status(404).send({message:'user not found'})
        }

        return res.status(200).send({message: "User deleted successfuly"})

        
    }catch(err){
        console.log(err.message)
        res.status(500).send({message: err.message})
    }
}) 

router.put('/:id', async(req, res)=>{ // Update user

    try {

      

        const {id} = req.params;
        const result = await User.findByIdAndUpdate(id, req.body)

        if(!result){
            return res.status(404).json({message: 'user not found'})
        }

        return res.status(200).send({message: 'user update successfully'})
        
    } catch (error) {

        console.log(error.message)
        res.status(500).send({message: error.message})
        
    }
})

router.get('/email/:email', async (req, res) => { // view one user by email
    try {
        const email = req.params.email; // Extract email from URL params
        const user = await User.findOne({ email:email })

        if (!user) {
            return res.status(404).json({ message: "Farmer not found" });
        }

        return res.status(200).json({
            data: farmer
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// User login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email" });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const { id, name,role } = user;
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', token, {
            httpOnly: true,
            // Secure: true, // Uncomment in production if served over HTTPS
            maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
            // SameSite: 'Lax' // Consider setting same-site policy based on your requirements
        });

        return res.json({ token, id, name, email,role, status: true, message: "Login successful" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


module.exports = router;