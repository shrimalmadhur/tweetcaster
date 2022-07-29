// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { redirect } from "next/dist/server/api-utils";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const state = req.query.state;
    const code = req.query.code;
    
    res.redirect("/twitter/client?state=" + state + "&code=" + code)
}