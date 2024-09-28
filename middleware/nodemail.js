import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true,
  auth: {
    user: "tinycloindia@gmail.com",
    pass: "ovczysymommvnfal",
  },
});

export const sendwelcomemail = async (email, name) => {
  const info = await transporter.sendMail({
    from: 'tinycloindia@gmail.com', // sender address
    to: email, // recipient email
    subject: "Welcome to TinyClo", // Subject line
    text: `Hi ${name},
    Welcome to TinyClo! We're thrilled to have you as part of our community. Explore the latest trends, exclusive collections, and exciting offers on our website.
    
    Feel free to reach out if you need any assistance.
    
    Happy shopping!
    
    Best regards,
    The TinyClo Team`, // plain text body
    html: `<p>Hi <strong>${name}</strong>,</p>
           <p>Welcome to <strong>TinyClo</strong>! We're thrilled to have you as part of our community. Explore the latest trends, exclusive collections, and exciting offers on our <a href="https://yourwebsite.com">website</a>.</p>
           <p>Feel free to reach out if you need any assistance.</p>
           <p>Happy shopping!</p>
           <p>Best regards,<br>The TinyClo Team</p>`, // HTML body
  });
};
