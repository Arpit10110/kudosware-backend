import Shopify from "shopify-api-node";
import express from "express";
import router from "./routes/route.js";
import cors from "cors"
import { config } from "dotenv";
import Razorpay from "razorpay"
const app = express();
config({
    path:"./config.env"
})
app.use(cors());
export const  shopify = new Shopify({
    shopName: process.env.ShopName ,
    apiKey: process.env.ApiKey,
    password: process.env.Password
});
export const instance = new Razorpay({
    key_id: process.env.RazarPay_key_id,
    key_secret: process.env.RazarPay_key_secret,
  });
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(router);

export default app;