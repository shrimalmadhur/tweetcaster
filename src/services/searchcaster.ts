import axios from "axios";
import { Dispatch } from "react";
import { getUsernameFromAddress } from "./farcaster";

export async function getFarcasterAddress(connectedAddress: string) {
    const res = await axios.get('/api/address/' + connectedAddress)
    return res.data[0].username
}

export async function getUsername(connectedAddress: string, setUsername: Dispatch<any>) {
    const address = await getFarcasterAddress(connectedAddress);
    setUsername(address)
}