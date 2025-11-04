import {Router} from 'express';
import { handleStaticURL} from '../controllers/url.js';
import {restrictTo} from '../middlewares/url.js'

const router = Router();



router.get("/home", restrictTo(["ADMIN"]), handleStaticURL);
router.get("/api/user/signup", (req, res)=>{
    return res.render('signUp');
} );
router.get("/api/user/login", (req, res) => {
    return res.render('login');
});


export {router as StaticRouter};