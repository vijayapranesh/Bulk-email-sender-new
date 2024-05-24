const express = require("express");
const nodemailer = require("nodemailer");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to file name to avoid name conflicts
  },
});

const upload = multer({ storage: storage });

// Email validation function
const validateEmails = (emails) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emails.split(',').every(email => emailRegex.test(email.trim()));
};

router.post("/send", upload.single("file"), async (req, res) => {
  const { to, subject, text } = req.body;
  const recipients = to.split(",").map(email => email.trim()); // Assume 'to' is a comma-separated list of emails

  if (!validateEmails(to)) {
    return res.status(400).json({ message: 'Invalid email format' });
}

  let mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: recipients,
    subject: subject,
    text: text,
    attachments: [],
  };

  if (req.file) {
    mailOptions.attachments.push({
      filename: req.file.filename,
      path: req.file.path,
    });
  }

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  try {
    await transporter.sendMail(mailOptions);
    res.send("Email sent successfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;























// const express = require("express");
// const nodemailer = require("nodemailer");
// const router = express.Router();

// router.post("/send", async (req, res) => {
//   const { to, subject, text } = req.body;
//   let transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USERNAME,
//       pass: process.env.EMAIL_PASSWORD,
//     },
//   });

//   try {
//     await transporter.sendMail({
//       from: process.env.EMAIL_USERNAME,
//       to: to,
//       subject: subject,
//       text: text,
//     });
//     res.send("Email sent");
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;
