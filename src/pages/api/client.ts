// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { TwitterApi } from 'twitter-api-v2';

const CLIENT_ID = process.env.NEXT_PUBLIC_TWEETCASTER_CLIENT_ID;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_TWEETCASTER_CLIENT_SECRET

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    console.log("In client")
    const code = req.query.code
    const codeVerifier = req.query.codeverifier
    console.log(code)
    console.log(codeVerifier)
    if (!codeVerifier || !code) {
        return res.status(400).send('You denied the app or your session expired!');
    }
    //   if (state !== sessionState) {
    //     return res.status(400).send('Stored tokens didnt match!');
    //   }
    
    if (!CLIENT_ID || !CLIENT_SECRET) {
        console.log("no client and sessionid")
        return res.status(400).send("CLIENT_ID or CLIENT_SECRET not present");
    }
    // Obtain access token
    const requestClient = new TwitterApi({ clientId: CLIENT_ID, clientSecret: CLIENT_SECRET });
    const redirectUri = "http://127.0.0.1:3000/api/redirect"

    try {
        const { client: userClient, refreshToken } = await requestClient.loginWithOAuth2({
            code: code,
            // the same URL given to generateOAuth2AuthLink
            redirectUri,
            // the verifier returned by generateOAuth2AuthLink
            codeVerifier,
        }); 
        res.status(200).send(userClient.getActiveTokens().bearerToken)
    } catch (e) {
        console.log(e)
        res.status(403).send("")
    }
}

// https://github.com/vercel/next.js/issues/2252#issuecomment-308238001