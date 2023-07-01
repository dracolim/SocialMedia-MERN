import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js"; /*route folder for every tpye of feature*/
import userRoutes from "./routes/users.js";
import postRoute from "./routes/posts.js";
import {register} from "./controllers/auth.js";
import {createPost} from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";

/** CONFIGURATIONS **/ /* MIDDLEWARE */
/* To grab file url */
const __filename = fileURLToPath(import.meta.url);
/* when u use type modules */
const __dirname = path.dirname(__filename);
/* to use env */
dotenv.config({path:__dirname+'/.env'});

/* invoke express app */
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb" , extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb" , extended: true}));
app.use(cors());
/* save images locally */
app.use("/assets" , express.static(path.join(__dirname , "public/assets")));


/** SET UP FILE STORAGE **/ /* MULTER : node.js middleware for handling multipart / form-data , primarily used for uploading files */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null , "public/assets");
    },
    filename: function (req, file, cb){
        cb(null , file.originalname);
    }
})
const upload = multer({ storage });  

/* ROUTES WITH FILES */
/* middleware function where we call before it hits the endpoint (upload.single("picture")) */
app.post("/auth/register" , upload.single("picture") ,  register);
/* the picture image will grab the pic property */
app.post("/posts" , verifyToken , upload.single("picture") , createPost );

/* ROUTES */
app.use("/auth" , authRoutes);
app.use("/users" , userRoutes);
app.use("/posts" , postRoute);

/* SET UP MONGODB */
const PORT = process.env.PORT || 6001 ;
mongoose.connect(process.env.MONGO_URL , {
    useNewUrlParser : true,
    useUnifiedTopology: true,
}). then (() => {
    app.listen(PORT , () => console.log(`Server Port: ${PORT}`));
})
.catch((error) => console.log(`${error} did not connect`));

