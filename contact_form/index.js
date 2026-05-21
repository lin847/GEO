const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { logger } = require("firebase-functions");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
const nodemailer = require("nodemailer");


if (admin.apps.length === 0) {
  admin.initializeApp();
}

const db = admin.firestore();




const transporterMain = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "Lkwebd1@gmail.com",
    pass: "grcf ziob lapd vblo",
  },
});

// Verify email configuration
transporterMain.verify((error, success) => {
  if (error) {
    console.error("Email configuration error:", error);
  } else {
    console.log("Email server is ready to send messages");
  }
});

const getContactEmailHtml = (data) => `
<div style="font-family: Arial, sans-serif; padding: 20px;">
  <h2>🚀 New Project Enquiry - LK Web Designers</h2>
  <p><strong>Name:</strong> ${data.name}</p>
  <p><strong>Email:</strong> ${data.email}</p>
  <p><strong>Phone:</strong> ${data.phone || "N/A"}</p>
  <p><strong>Company:</strong> ${data.company || "N/A"}</p>
  <p><strong>Services:</strong> ${
    data.selectedServices?.join(", ") || "N/A"
  }</p>
  <hr/>
  <p><strong>Message:</strong></p>
  <p>${data.message || "No message provided"}</p>
</div>
`;

exports.contactForm = functions.https.onRequest((req, res) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.status(204).send('');
    return;
  }

  // Handle actual request
  return cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  const { name, email, phone, company, selectedServices, message } =
      req.body;

    if (!name || !email || !Array.isArray(selectedServices)) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
    
      console.log("From:", "LK Web Designers <Lkwebd1@gmail.com>");
      
      const result = await transporter.sendMail({
        from: "LK Web Designers <Lkwebd1@gmail.com>",
        to: "Lkwebd1@gmail.com",
        replyTo: email,
        subject: "New Project Enquiry",
        html: getContactEmailHtml({
          name,
          email,
          phone,
          company,
          selectedServices,
          message,
        }),
      });
      
      console.log("Email sent successfully:", result.messageId);
      return res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Email sending failed:", error);
      console.error("Error details:", error.message);
      return res.status(500).json({ message: "Email failed", error: error.message });
    }
  
  });
});