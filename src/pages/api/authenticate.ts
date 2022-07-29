// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { TwitterApi } from 'twitter-api-v2';


const CLIENT_ID = process.env.NEXT_PUBLIC_TWEETCASTER_CLIENT_ID;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_TWEETCASTER_CLIENT_SECRET

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if (!CLIENT_ID || !CLIENT_SECRET) {
        res.status(400).send("CLIENT_ID or CLIENT_SECRET not present");
        return
    }
    const client = new TwitterApi({ clientId: CLIENT_ID, clientSecret: CLIENT_SECRET });

    const { url, codeVerifier, state } = client.generateOAuth2AuthLink(
        "http://127.0.0.1:3000/api/redirect", 
        { 
            scope: ['tweet.read', 'users.read', 'offline.access', 'tweet.write'] 
        }
    );

    const returnObj = {
        'redirect_url': url,
        'codeVerifier': codeVerifier,
        'state': state
    }


    res.status(200).send(returnObj)
}