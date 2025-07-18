import {Router} from 'express';
import { handleGenerateNewShortURl,
        handleGetOriginalOneURl,
        handleGetAnalytics,
        handleGetAllURL,
        handleStaticURL } from '../controllers/url.js';

const router = Router();

router.post("/", handleGenerateNewShortURl);
router.get("/analysic/:shortUrl", handleGetAnalytics);
router.get("/home", handleGetAllURL);
router.get("/:url",handleGetOriginalOneURl );




export {router as userRouter};