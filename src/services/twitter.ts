import axios from "axios";
import { Dispatch } from "react";

export async function authenticate() {
    const res = await axios.get('/api/authenticate');
    return res;
}

export async function getTwitterClient(code: string, codeVerifier: string) {
    const res = await axios.get('/api/client?code=' + code + "&codeverifier=" + codeVerifier);
    return res;
}