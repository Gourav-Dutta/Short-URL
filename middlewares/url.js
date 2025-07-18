import express from 'express';
import { getUser } from '../service/auth.js';


function json(){
    return express.json();
}

async function restrictToLoggedinUserOnly(req, res, next){
    // console.log(req);
    
    const userUid = req.cookies?.uid;

    if(!userUid) return res.redirect("/api/user/login");

    const user = getUser(userUid);

    if(!user) return res.redirect("api/user/login");

    req.user = user;
    next();

}

export {json,restrictToLoggedinUserOnly };