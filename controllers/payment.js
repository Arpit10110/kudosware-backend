import { instance } from "../app.js";
import crypto from "crypto";
export const checkout = async (req, res) => {
  const options = {
    amount: Number(req.body.amount * 100), // amount in the smallest currency unit
    currency: "INR",
  };
  const order = await instance.orders.create(options);
  res.json({
    success: true,
    order,
  });
};

export const paymentverification = async (req, res) => {
    try {
        const {razorpay_payment_id,razorpay_order_id,razorpay_signature}=req.body;
        const body = razorpay_order_id+ "|" + razorpay_payment_id
        const generated_signature = crypto
        .createHmac("sha256",process.env.RazarPay_key_secret)
        .update(body.toString())
        .digest("hex")
        const isPayment = razorpay_signature == generated_signature
        if (isPayment)
        {
          res.redirect(`https://kudosware-testing.vercel.app/#success?refrence=${razorpay_payment_id}`);
        }
        else{
          res.redirect(`https://kudosware-testing.vercel.app/#fail?refrence=${razorpay_payment_id}`);
        }
    } catch (error) {
        console.error(error);
    }
  
};
