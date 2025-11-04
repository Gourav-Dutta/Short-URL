// This is my STATE-FULL Authentication --> 

// const sessionIdToUseMap = new Map();

// function setUser(id, user){
//     sessionIdToUseMap.set(id, user);
// }

// function getUser(id){
//     return sessionIdToUseMap.get(id);
// }


// export {setUser, getUser}




// STATE-LESS Authentication  (JWT) --> 


import jwt from  'jsonwebtoken';
const secret = "GouravDev12@12$";

function setUser(user){
    return jwt.sign({
        name : user.name,
        email : user.email,
        id : user.id,
        role : user.role || "NORMAL"
    }, secret);
};

function getUser(token){
    try{
        return jwt.verify(token, secret);
    } catch(error){
       console.log("An error occur");
       return null;
       
    }
}

export {
    setUser,
    getUser
}