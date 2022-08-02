// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { TwitterApi } from 'twitter-api-v2';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const bearerToken = req.headers.token;
    console.log("bearerToken")
    console.log(bearerToken)
    if (typeof bearerToken != "string") {
        res.status(400).send("");
        return;
    }
    const message = req.body.text

    const twitterClient = new TwitterApi(bearerToken)
    const response = await twitterClient.v2.tweet(message)

    res.status(200).send(response.data)
}