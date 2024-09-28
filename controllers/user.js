import { shopify } from "../app.js";
import { sendwelcomemail } from "../middleware/nodemail.js";
import { UserModel } from "../model/UserModel.js";
export const SignUP = async (req, res) => {
    const { Fname, Email, Phone, Password, address } = req.body; 
    const newCustomer = {
        first_name: Fname,
        email: Email,
        phone: Phone,
        verified_email: true,
        password: Password,
        password_confirmation: Password,
        addresses: address ,
        send_email_welcome:false
    };

    try {
        const existingCustomers = await shopify.customer.search({ email: Email });

        // Customer already exists, return an appropriate message
        if (existingCustomers.length > 0) {
            return res.json({
                status: false,
                message: "User already exists",
            });
        }


        // if the user exist on mongodb but not found in shopify , then delete the user from the mongodb as well
        const isSignup= await UserModel.findOne({email:Email});
        if(isSignup){
            await UserModel.deleteOne({ email: Email });
        }



        // If no customer exists, proceed to create a new customer
        const customer = await shopify.customer.create(newCustomer);
        await UserModel.create({
            email: Email,
            password: Password,
        })
        const info = await sendwelcomemail(Email, Fname);

        return res.json({
            status: true,
            message: "Customer created ",
            data: customer,
            mailerInfo: info
        });
    } catch (err) {
        console.error("Error creating customer:", err);

        return res.json({
            status: false,
            message: "Please try again",
            error: err.response ? err.response.body : err.message,
        });
    }
};

export const login =async(req,res)=>{
    const {Email,Password} = req.body;
    try {
        const customers = await shopify.customer.search({ query: `email:${Email}` });
        const isLogin= await UserModel.findOne({email:Email});
        if (customers.length === 0) {
            return res.json({
                status: false,
                message: "User not found !",
            });
        }

        const customer = customers[0];
        if (Password != isLogin.password) {
            return res.json({
                status: false,
                message: "Wrong Password !",
            });
        }else{
            return res.json({
                status: true,
                message: "Welocome to Tinyclo !",
                data:customer
            });
        }
    } catch (err) {
        console.error("Error logging in:", err);
        return res.json({
            status: false,
            message: "Try again !",
            err:err
        });
    }
} 


export const Fpassword = async(req,res)=>{
    const {Email,Password} = req.body;
    try {
        const customers = await shopify.customer.search({ query: `email:${Email}` });
        if (customers.length === 0) {
            return res.json({
                status: false,
                message: "User not found !",
            });
        }
        // change the password of the customer with the new password
        const updateResult = await UserModel.findOneAndUpdate(
            { email: Email },
            { password: Password },
            { new: true } // Return the updated document
        );

        return res.json({
            status: true,
            message: "Password updated successfully!",
            data: updateResult,
        });
    } catch (err) {
        console.error("Error resetting password:", err);

        return res.json({
            status: false,
            message: "Error resetting password, please try again",
            error: err.message,
        });
    }
   
}

export const profile = async(req,res)=>{
    const {userid} =req.body;
    try {
        const customer = await shopify.customer.get(userid);
        return res.json({
            status : true,
            data : customer
        })
    } catch (error) {
       return res.send({
            status : false,
            message: error
        })
    }
}