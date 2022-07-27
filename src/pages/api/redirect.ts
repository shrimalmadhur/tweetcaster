// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const state = req.query.state;
    const code = req.query.code;
    console.log(state);
    console.log(code);

    res.status(200).send("success")
}