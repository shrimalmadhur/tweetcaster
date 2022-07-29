import axios from "axios";

export async function authenticate() {
    const res = await axios.get('/api/authenticate');
    return res;
}

export async function getTwitterClient(code: any, codeVerifier: any) {
    const res = await axios.get('/api/client?code=' + code + "&codeverifier=" + codeVerifier);
    return res;
}