import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import db from "../../../../../db";
import crypto from "crypto";

require("dotenv").config();

const baseUrl = "http://localhost:3000";

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
    headers: any;
    timeCreated: Date | number;
  }
}

const forgetPassword = handler.post<ExtendedRequest | NextApiResponse>(
  async (req, res, next) => {
    try {
      const email = req.body.email;

      const user = await db.query("SELECT * FROM users where email = $1", [
        email,
      ]);

      if (user.rows.length === 0) {
        return res.status(422).json({
          message: "User does not exist",
          status: "error",
        });
      } else {
        // get the random token
        const token = crypto.randomBytes(32).toString("hex");
        // timecreated = current time + 1hr
        const timeCreated = Date.now() + 3600000;

        // send the mail

        try {
          const msg = {
            to: email,
            from: process.env.FROM_EMAIL,
            subject: "Reset Password",
            text: `Hello ${email}, use this link to reset your password.`,
            html: `
            
                <p style="font-family: Helvetica,Arial,sans-serif">
                    Hello <span style="font-weight: bold">${email}</span>, you are receiving this email because you (or someone else) have requested the reset of the password for your account. Please click on the following <a href=${baseUrl}/auth/reset-password?token=${token}>link</a>, or paste this into your browser to complete the process within one hour of receiving it: <span >${baseUrl}/auth/reset-password?token=${token}<span>. <br/> If you did not request this, please ignore this email and your password will remain unchanged.
                </p>

                `,
          };
          const sentEmail = await sgMail.send(msg);
          if (sentEmail) {
            res.status(201).json({
              status: "success",
              message: "Password reset link sent successfully",
              data: {
                timeCreated,
                email,
                token,
              },
            });
          } else {
            res.status(500).json({
              status: "error",
              message: "Error sending password reset link",
            });
          }
        } catch (error: any) {
          res.status(500).json({
            status: "error",
            message: error.message,
          });
        }

        console.log(token);
        // if current time is greater than the timeCreated then the token is expired
      }
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ status: "error", message: err.message });
    }
  }

  //         }
);

export default forgetPassword;
