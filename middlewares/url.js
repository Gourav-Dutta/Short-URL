import express from 'express';
import { getUser } from '../service/auth.js';


function json(){
    return express.json();
}


// Token Comming from cookie in the case of browser -->

// async function restrictToLoggedinUserOnly(req, res, next){
//     // console.log(req);
    
//     const userUid = req.cookies?.uid;

//     if(!userUid) return res.redirect("/api/user/login");

//     const user = getUser(userUid);

//     if(!user) return res.redirect("api/user/login");

//     req.user = user;
//     next();

// }



// Header Based  Authenticatioin --> 
// async function restrictToLoggedinUserOnly(req, res, next){
//     // console.log(req);
//     // console.log(req.headers);
    
//     const userUid = req.headers["authorization"];      //  "Bearer 578461336549542122"

//     if(!userUid) return res.redirect("/api/user/login");
//     const token = userUid.split("Bearer ")[1]; 

//     const user = getUser(token);

//     if(!user) return res.redirect("api/user/login");

//     req.user = user;
//     next();

// }





// Authorization :: 

 function checkForAuthentication(req, res, next){
    
    // const AuthorizationHeaderValue = req.headers["authorization"]; 
    const token  = req.cookies?.token; 
    req.user = null;
    // if(!AuthorizationHeaderValue || !AuthorizationHeaderValue.startsWith("Bearer")) return  next();
    if(!token) return  next();

    // const token = AuthorizationHeaderValue.split("Bearer ")[1];
    // if(!token) return next();
    const user = getUser(token);
    req.user = user;
    next();
 }

function restrictTo(roles = []){
    return function (req, res, next){
        console.log(req.user);
        
        if(!req.user) return res.redirect("/api/user/login");
        if(!roles.includes(req.user.role)) return res.end("You are not allowed to access this resources");
        console.log("User Role : ", req.user.role);
        
        next();
    };
}



export {json,checkForAuthentication,restrictTo};