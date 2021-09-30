const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const { GMAIL_PASSWORD } = process.env;

router.post("/api/contactform", (req, res) => {
  console.log(req.body);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "miketheboy11@gmail.com",
      pass: GMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: req.body.eMail,
    to: "kontakt@kindersport-wissen.de",
    subject: `Message from ${req.body.eMail}: ${req.body.subject}`,
    html: `<ul>
      <li>${req.body.fName}</li>
      <li>${req.body.eMail}</li>
      <li>${req.body.tel}</li>
      </ul>
      <p>${req.body.message}</p><br>
      <p>This message was sent by the website contact form</p>
      `,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("error");
    } else {
      console.log(`Email sent: ` + info.response);
      res.send("success");
    }
  });
});

module.exports = router;
