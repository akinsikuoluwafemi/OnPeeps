import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import db from "../../../../../db";
import bcrypt from "bcrypt";
import otpGenerator from "otp-generator";
import crypto from "crypto";

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
  status: "error" | "success";
};

declare module "next" {
  export interface NextApiRequest {
    user?: any;
    body: any;
  }
}

handler.use(async (req: ExtendedRequest, res: NextApiResponse, next) => {
  console.log("from reset", req.timeCreated);
  next();
});

const resetPassword = handler.put<ExtendedRequest | NextApiResponse>(
  async (req, res, next) => {
    try {
      const timeCreated = req.body.timeCreated;
      if (timeCreated) {
        const currentTime = new Date().getTime();
        if (currentTime - timeCreated > 3600000) {
          return res.status(400).json({
            message: "Password reset Link expired",
            status: "error",
          });
        } else {
          const password = req.body.password;
          const confirm_password = req.body.confirm_password;
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          const hashedConfirmPassword = await bcrypt.hash(
            confirm_password,
            salt
          );

          try {
            const user = await db.query(
              "SELECT * FROM users where email = $1",
              [req.body.email]
            );

            if (user.rows.length > 0) {
              await db.query(
                "UPDATE users SET password = $1, confirm_password = $2 where email = $3",
                [hashedPassword, hashedConfirmPassword, req.body.email]
              );
              return res.status(200).json({
                message: "Password reset successful",
                status: "success",
              });
            } else {
              return res.status(422).json({
                message: "User does not exist",
                status: "error",
              });
            }
          } catch (err: any) {
            console.log(err.message);
            return res.status(500).json({
              message: "Something went wrong",
            });
          }
        }
      }
    } catch (err: ResponseError | any) {
      console.log(err);
      res.status(500).json({ status: "error", message: err.message });
    }
  }

  //         }
);

export default resetPassword;
