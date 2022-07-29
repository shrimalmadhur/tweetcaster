import { TwitterApi } from 'twitter-api-v2';
import axios from "axios";


const CLIENT_ID = process.env.NEXT_PUBLIC_TWEETCASTER_CLIENT_ID;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_TWEETCASTER_CLIENT_SECRET

export async function authenticate() {
    const res = await axios.get('/api/authenticate');
    return res;
}

export async function getTwitterClient(code: any, codeVerifier: any) {
    const res = await axios.get('/api/client?code=' + code + "&codeverifier=" + codeVerifier);
    return res;
}