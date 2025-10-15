import express from 'express';
import multer from 'multer';
import { uploadToS3 } from '../services/s3Service.js';


const uploadRouter = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

uploadRouter.post("/upload", upload.single("video"), async (req, res ) => {
    try { 
        const videoUrl = await uploadToS3(req.file);
        res.json({ success: true, videoUrl })
    } catch ( err ) {
        console.error(err);
        res.status(500).json({ success: false, message: "Upload failed"});
    }
})

export default uploadRouter;