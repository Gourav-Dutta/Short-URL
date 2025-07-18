import Router from 'express';
import { signupFunction, loginFunction} from '../controllers/user.js';

const router = Router();

router.post("/signup", signupFunction );
router.post("/login", loginFunction );


export {router as authRouter}