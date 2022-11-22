import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import db from "../../../../db";

require("dotenv").config();

interface ExtendedRequest extends NextApiRequest {
  user: any;
  body: any;
}

interface ExtendedResponse {
  message: string;
}

const handler = nc<NextApiRequest, NextApiResponse>();

type ResponseError = {
  message: string;
  status: "error" | "success";
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

const getSingleUser = handler.post<ExtendedRequest | NextApiResponse>(
  async (req, res, next) => {
    try {
      const email = req.body.email;

      const user = await db.query("SELECT * FROM users where email = $1", [
        email,
      ]);

      if (user.rows.length > 0) {
        return res.status(200).json({
          message: "User exists",
          status: "success",
          data: user.rows[0],
        });
      } else {
        return res.status(422).json({
          message: "User does not exist",
          status: "error",
        });
      }
    } catch (err: any | ResponseError) {
      console.log(err);
      res.status(500).json({ status: "error", message: err.message });
    }
  }
);

export default getSingleUser;
