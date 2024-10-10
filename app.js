import Shopify from "shopify-api-node";
import express from "express";
import router from "./routes/route.js";
import cors from "cors"
import { config } from "dotenv";
const app = express();
config({
    path:"./config.env"
})
export const  shopify = new Shopify({
    shopName: process.env.ShopName ,
    apiKey: process.env.ApiKey,
    password: process.env.Password
});
const corsOptions = {
    origin: process.env.Frontend_url, // Add your frontend domain here
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods if necessary
    credentials: true, // If you're using cookies or credentials like tokens
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(router);
export default app;