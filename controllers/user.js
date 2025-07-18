import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { setUser } from "../service/auth.js";

const prisma = new PrismaClient();


async function handleUserSignup(req, res){
    const payload = {
        name : req.body.name,
        email : req.body.email,
        password : req.body.password 
    };

    const user = await prisma.user.create({
        data : payload
    });

    if(user){
        // return res.render('home')

        // return res.json({
        //     data : user
        // })

         return res.redirect("/api/user/login");
    } else {
        return res.json({
            message : "Faled to Signup"
        })
    };
}


async function handleUserLogin(req, res) {
    
    
    const data = {
        email : req.body.email,
        password: req.body.password
    };

    const user = await prisma.user.findFirst({
        where : {
            email : data.email,
            password : data.password
        }
    })

    if(!user){
        return res.render('login', {
            error : "Invalid Login Credentials"
        })
    };

    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("uid", sessionId);
    return res.redirect("/url/home");
}

export {
     handleUserSignup as signupFunction,
     handleUserLogin as loginFunction
}