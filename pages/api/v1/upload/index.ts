import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import multer from "multer";
import path from "path";
import fs from "fs";
import { cloudinaryUpload } from "../../../../utils/cloudinary";

// interface ExtendedRequest {
//   //   user: any;
//   file: any;
// }

// interface ExtendedResponse {
//   //   message: string;
// }

// interface ExtendedResponse {
//     cookie(name: string, value: string): void;
//   }

const handler = nc<NextApiRequest, NextApiResponse>();

// handler.use(signUp);

type ResponseError = {
  //   message: string;
  //   data?: any;
};

declare module "next" {
  export interface NextApiRequest {
    // user?: any;
    file?: any;
  }
}

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },

  filename: function (req, file, cb) {
    return cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

let upload = multer({ storage: storage });

// handler.post(upload.single("file"), (req, res) => {
//   console.log("req.file", req.file);
//   console.log("req.body", req.body);
//   res.status(200).json({ message: "success" });
// });

let uploadFile = upload.single("file");
handler.use(uploadFile);

handler.post(async (req, res) => {
  try {
    const result = await cloudinaryUpload(req.file.path);
    console.log("result", result);
    res.status(200).json({ message: "success", result });
  } catch (error: any) {
    console.log("error", error);
  }
});

export default handler;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
