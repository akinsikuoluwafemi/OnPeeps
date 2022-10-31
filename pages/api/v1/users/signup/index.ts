import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import db from "../../../../../db";
import bcrypt from "bcrypt";
import otpGenerator from "otp-generator";
require("dotenv").config();

const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SG_API_KEY);

interface ExtendedRequest extends NextApiRequest {
  user: any;
  body: any;
}

interface ExtendedResponse {
  message: string;
}

// interface ExtendedResponse {
//     cookie(name: string, value: string): void;
//   }

const handler = nc<NextApiRequest, NextApiResponse>();

type ResponseError = {
  message: string;
  data?: any;
};

declare module "next" {
  export interface NextApiRequest {
    user?: any;
    body: any;
    unAuthUser?: any;
  }
}

const signUp = handler.post<ExtendedRequest | NextApiResponse>(
  async (req, res, next) => {
    try {
      // find user by email
      const user = await db.query("SELECT * FROM users where email = $1", [
        req.body.email,
      ]);

      // if the user exists
      if (user.rows.length > 0) {
        return res.status(400).json({
          message: "User already registered",
        });
      } else {
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
        if (newOTP.rows.length > 0) {
          // send the otp to the user
          try {
            const msg = {
              to: req.body.email,
              from: process.env.FROM_EMAIL,
              subject: "OTP",
              text: `Kindly use this OTP to verify your email: ${OTP}`,
              html: `<h1>Your OTP is ${OTP}</h1>
              <p>Thank you</p>
              <p>OnPeeps</p>
              <p>https://onpeeps.com</p>
              <small> This is an automated email, please do not reply to this email</small>
              `,
            };
            const sentEmail = await sgMail.send(msg);
            if (sentEmail) {
              res.status(200).json({
                status: "success",
                message: "OTP sent successfully",
              });

              // console.log(sentEmail);

              const unAuthUser = req.body;
              req.unAuthUser = unAuthUser;
              next();
              // console.log(req.unAuthUser, +"unAuthUser");
            }
          } catch (error) {
            console.log(error);
            res.status(500).json({
              status: "error",
              message: "Error sending OTP",
            });
          }
        } else {
          res.status(400).json({
            status: "error",
            message: "Error creating OTP",
          });
        }
      }
    } catch (error: any) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }
);

export default signUp;
