import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import db from "../../../db";
import bcrypt from "bcrypt";
import otpGenerator from "otp-generator";
require("dotenv").config();

const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SG_API_KEY);

interface ExtendedRequest extends NextApiRequest {
  body: any;
}

const handler = nc<NextApiRequest, NextApiResponse>();

declare module "next" {
  export interface NextApiRequest {
    user?: any;
    body: any;
  }
}

const resendOtp = handler.post<ExtendedRequest | NextApiResponse>(
  async (req, res, next) => {
    try {
      const OTP = otpGenerator.generate(6, {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });

      const number = req.body.otp_number;
      console.log(number);
      console.log(OTP);

      const salt = await bcrypt.genSalt(10);

      // hash the otp
      const hashedOTP = await bcrypt.hash(OTP, salt);
      console.log(hashedOTP);

      // create the otp in the database
      const newOTP = await db.query(
        "INSERT INTO otps (otp, otp_number) VALUES ($1, $2) RETURNING *",
        [hashedOTP, number]
      );

      console.log(newOTP.rows[0]);

      // if its created
      if (newOTP.rows.length > 0) {
        // send the otp to the user
        const msg = {
          to: req.body.email,
          from: process.env.FROM_EMAIL,
          subject: "Your OTP",
          text: `Hello ${req.body.email}, your OTP is ${OTP}`,
          html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:100%;overflow:auto;line-height:2">
                <div style="margin:50px auto;width:70%;padding:20px 0">
                  <div style="border-bottom:1px solid #eee">
                    <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">OnPeeps</a>
                  </div>
                  <p style="font-size:1.1em">Hi,</p>
                  <p>Thank you for choosing OnPeeps. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
                  <h2 style="background: #00466a;margin: 0 auto;width: 100%;padding: 0 10px; text-align: center; color: #fff;border-radius: 4px;">${OTP}</h2>
                  <p style="font-size:0.9em;">Regards,<br />OnPeeps</p>
                  <hr style="border:none;border-top:1px solid #eee" />
                  <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                    <p>Onpeeps Inc</p>
                    <p>1600 Amphitheatre Parkway</p>
                    <p>UK</p>
                  </div>
                </div>
              </div>
                `,
        };
        const sentEmail = await sgMail.send(msg);
        if (sentEmail) {
          res.status(201).json({
            status: "success",
            message: "OTP sent successfully",
          });
        } else {
          res.status(400).json({
            status: "failed",
            message: "OTP not sent",
          });
        }
      }
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: "Error creating OTP",
      });
    }
  }
);

export default resendOtp;
