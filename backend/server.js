import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import helmet from 'helmet';
import morgan from 'morgan';
import userRouter from './routes/users.js';
import authenticateRouter from './routes/auth.js';
import postRouter from './routes/post.js';
import path from 'path';
import multer from 'multer';

dotenv.config();
const app = express();

const port  = process.env.PORT;

mongoose.connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("Connected to MongoDB");
    }
);
const __dirname = path.resolve();

app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(express.static(path.join(__dirname, '/frontend/build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
})


app.use(express.json());
app.use(helmet());
app.use(morgan("common"))

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
})

const upload= multer({ storage: storage });

app.post("/api/upload", upload.single("file") , (req,res) => {
    try{
        return res.status(200).json("File submitted successfully.")
    }catch(err){
        res.status(400).send({error:"error, file could not be sent"})
    }
})


app.use("/api/auth", authenticateRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);


app.get('/',(req,res) => {
    res.send('Server is ready');
});



app.use((err,req,res,next) =>{
    res.status(500).send({ message: err.message });
})

app.listen(port , () =>{
    console.log("Server is up on " + port)
})