import { FC, useContext, useEffect, useState } from 'react';
import useStorage from 'hooks/useStorage'
import Connect from "components/Connect";
import styles from "@/styles/Home.module.css";
import dynamic from "next/dynamic";
import { IClientOAuth2UserClient, IParsedOAuth2TokenResult, TwitterApi } from 'twitter-api-v2';
import { NextPage } from 'next'
import { getAllCasts, getAllCastsAndSet, postCast, generatePkFromSeed } from '../../services/farcaster'
import { useSigner } from 'wagmi'
import axios from "axios";

const SEED = process.env.NEXT_PUBLIC_MNEMONIC


const Post: NextPage = () => {

    const { getItem, setItem } = useStorage();
    const [message, setMessage] = useState('');
    const token = getItem("bearerToken");
    // const {data: signer} = useSigner();

    const handleChange = event => {
        setMessage(event.target.value);
    };

    async function handleClick(event: any) {
        event.preventDefault();

        // 👇️ value of input field
        console.log('handleClick 👉️', message);
        const privateKey = generatePkFromSeed(SEED)

        const result = await postCast(privateKey, message, null)

        const payload = {
            text: message
        }

        const headers = {
            token: token
        }
        const res = await axios.post('/api/post', payload, {
            headers: headers
        })

        // console.log(result)
    };

    return (
        <div className={styles.container}>
            Token: {token}
            <div>
                <input
                    type="text"
                    id="message"
                    name="message"
                    value={message}
                    onChange={handleChange}
                    autoComplete="off"
                />


                <button onClick={handleClick}>Post</button>
            </div>
            {/* <Connect></Connect> */}
        </div>
    )
}

export default dynamic(() => Promise.resolve(Post), { ssr: false });