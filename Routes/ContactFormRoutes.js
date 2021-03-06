const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const { GMAIL_PASSWORD, GMAIL_CLIENT, GMAIL_SECRET } = process.env;

router.post("/api/contactform", (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "miketheboy11@gmail.com",
      pass: GMAIL_PASSWORD,
      clientId: GMAIL_CLIENT,
      clientSecret: GMAIL_SECRET,
    },
  });

  const mailOptions = {
    from: req.body.eMail,
    to: "miketheboy11@gmail.com",
    subject: `Message from ${req.body.eMail}: ${req.body.subject}`,
    html: `<ul>
      <li>${req.body.fName}</li>
      <li>${req.body.eMail}</li>
      </ul>
      <p>${req.body.message}</p><br>
      <p>This message was sent by the spieplatzchecken.de contact form</p>
      `,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.send("error");
    } else {
      console.log(`Email sent: ` + info.response);
      res.send("success");
    }
  });
});

module.exports = router;
