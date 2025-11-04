import { PrismaClient } from "@prisma/client";
import { render } from "ejs";
import nanoId from "nano-id";

const prisma = new PrismaClient();


async function handleGenerateNewShortURl(req, res) {
    console.log(req.user);
    
    const body = req.body;

    if(!body.url) return res.status(400).json({ error : "URL is must required"});

    const ShortID = nanoId(8);

    const payload = { 
        shortCode : ShortID,
        originalUrl : body.url,
        createdById : req.user.id, 
    }

    const user = await prisma.shortUrl.create({
        data : payload
    });


    return res.render('home', {
        id : ShortID
    })
    //  res.redirect(user.originalUrl);

}


async function handleGetOriginalOneURl(req, res){

    const myUrl = req.params.url;
    // const name = req.params.name;
    console.log(myUrl);
    

    const user = await prisma.shortUrl.update({
        where : {shortCode : myUrl},
        data : {clicks : {increment: 1},
                // name : name         
               }
    });

    res.redirect(user.originalUrl);
    
}


async function handleGetAnalytics (req, res) {
    const myUrl = req.params.shortUrl;
    console.log(myUrl);
    
    const Domain = await prisma.shortUrl.findUnique({
        where : {shortCode : myUrl},
    });
    if(!Domain){
     return res.status(404).json({ error: "Short URL not found" });
    }
    return res.status(202).json({
        message : "User founded",
        click :  Domain.clicks,
        Created_By : Domain.createdById, 
        user : Domain,
    });

}


async function handleGetAllURL(req, res){
    const name = req.user.name;
    const AllURL = await prisma.shortUrl.findMany({
        where : {createdById : req.user.id}
    });
    return res.render('home', {
        urls : AllURL,
        user : name
    });
}


async function handleStaticURL(req, res){

   const AllURL = await prisma.shortUrl.findMany();
    return res.render('home', {
        urls : AllURL,  
    });
}

export {handleGenerateNewShortURl,
        handleGetOriginalOneURl,
        handleGetAnalytics,
        handleGetAllURL,
        handleStaticURL    
        }