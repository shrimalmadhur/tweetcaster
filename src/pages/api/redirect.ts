// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const state = req.query.state;
    const code = req.query.code;
    res.redirect("/twitter/client?state=" + state + "&code=" + code)
}