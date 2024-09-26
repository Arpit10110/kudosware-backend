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
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(router);
export default app;