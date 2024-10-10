import app from "./app.js";
import {connectDb} from "./db/db.js"
import Razorpay from "razorpay"
export const instance = new Razorpay({
    key_id: process.env.RazarPay_key_id,
    key_secret: process.env.RazarPay_key_secret,
  });
connectDb()

app.listen(process.env.PORT,()=>{
    console.log(`Server listening on port ${process.env.PORT}`);
})