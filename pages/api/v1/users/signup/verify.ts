import bcrypt from "bcrypt";
import db from "db";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { QueryArrayResult } from "pg";
import signUp from ".";

interface ExtendedRequest {
  user: any;
}

interface ExtendedResponse {
  message: string;
}

// interface ExtendedResponse {
//     cookie(name: string, value: string): void;
//   }

const handler = nc<NextApiRequest, NextApiResponse>();

// handler.use(signUp);

type ResponseError = {
  message: string;
  data?: any;
};

declare module "next" {
  export interface NextApiRequest {
    user?: any;
  }
}

export default handler.post<ExtendedRequest | NextApiResponse>(
  async (req, res, next) => {
    try {
      const otpHolder: QueryArrayResult<any[]> | any = await db.query(
        "SELECT * FROM otps where otp_number = $1",
        [req.body.otp_number]
      );
      const otpTime = otpHolder.rows[0]?.timestamp;

      const getMinDiff = (startDate: any, endDate: any): number => {
        const msInMinute = 60 * 1000;

        return Math.round(Math.abs(endDate - startDate) / msInMinute);
      };

      console.log(getMinDiff(new Date(), otpTime));

      // if the timestamps is more than 5 minutes ago
      if (getMinDiff(new Date(), otpTime) > 5 || otpHolder.rows.length === 0) {
        return res.status(400).json({
          message: "OTP expired",
          status: "expired",
        });
      } else {
        const isMatch = bcrypt.compareSync(req.body.otp, otpHolder.rows[0].otp);
        if (isMatch) {
          console.log(req.body.user);
          // send the user to the backend to create the user in the database and send the user a cookie to the frontend to log them in
          res.send("user sent to the backend");
        } else {
          return res.status(400).json({
            message: "OTP does not match",
            status: "invalid",
          });
        }
      }
    } catch (err: any) {
      console.log(err);
    }
  }
);
