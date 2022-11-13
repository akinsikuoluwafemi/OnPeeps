import bcrypt from "bcrypt";
import db from "db";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { QueryArrayResult } from "pg";
import signUp from ".";
import jwt from "jsonwebtoken";

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
          const salt = await bcrypt.genSalt(10);
          const user = req.body.user;
          const hashedPassword = await bcrypt.hash(user.password, salt);
          const hashedConfirmPassword = await bcrypt.hash(
            user.confirm_password,
            salt
          );

          const result = await db.query(
            "INSERT INTO users (username, email, password, confirm_password, id_card_picture, cell_phone, verified) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [
              user.username,
              user.email,
              hashedPassword,
              hashedConfirmPassword,
              user.file,
              user.cell_phone,
              user.verified,
            ]
          );

          const userResult = result.rows[0];
          console.log("userResult", userResult);

          // const token = jwt.sign(
          //   {
          //     id: userResult.id,
          //     username: userResult.username,
          //     email: userResult.email,
          //     cell_phone: userResult.cell_phone,
          //     verified: userResult.verified,
          //   },
          //   process.env.JWT_SECRET,
          //   {
          //     expiresIn: "1d",
          //   }
          // );

          res.status(200).json({
            message: "User created successfully",
            status: "success",
            user: {
              email: user.email,
            },
          });
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
