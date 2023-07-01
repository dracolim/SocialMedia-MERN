import bcrypt from "bcrypt" ; 
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTER USER */
/* call MONGOOSE DB have to be async */
export const register = async (req , res) => {
    /* req: frontened ; res: backend */
    try{
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body; 

        const salt = await bcrypt.genSalt(); /* create a salt to encrypt our password */
        const passwordHash = await bcrypt.hash(password , salt) ; /* hash the password */

        const newUser = new User({
            firstName,
            lastName,
            email,
            password : passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random * 10000),
            impressions: Math.floor(Math.random * 10000),
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser) /* if 201 is send, user is saved */

    } catch (err){
        res.status(500).json({error : err.message });
    }
}

/* logging in */
export const login = async (req , res) => {
    try {
        const {email , password} = req.body;
        /** use mong0ose to find the specified email  */
        const user = await User.findOne({ email : email}) ; 
        if (!user) {
            return res.status(400).json({ msg: "User does not exist. "});
        }

        /* check if password matched  */
        const isMatch = await bcrypt.compare(password , user.password);
        if (!isMatch){
            return res.status(400).json({ msg: "Invalid credentials. "});
        }
        /* json web token */
        const token = jwt.sign({ id: user._id} , process.env.JWT_SECRET);
        delete user.password;
        res.stats(200).json({token , user});
    }
    catch (err) {
        res.status(500).json({ error : err.message });
    }
}