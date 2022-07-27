import { TwitterApi } from 'twitter-api-v2';
import axios from "axios";

export async function authenticate() {
    const res = await axios.get('/api/authenticate');
    return res;
}