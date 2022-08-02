import { FC, useContext, useEffect, useState } from 'react';
import useStorage from 'hooks/useStorage'
import Connect from "components/Connect";
import styles from "@/styles/Home.module.css";
import dynamic from "next/dynamic";
import { IClientOAuth2UserClient, IParsedOAuth2TokenResult, TwitterApi } from 'twitter-api-v2';
import { NextPage } from 'next'


const Post: NextPage = () => {

    const { getItem, setItem } = useStorage();
    const token = getItem("bearerToken")
    return (
        <div className={styles.container}>
            Token: {token}
            <Connect></Connect>
        </div>
    )
}

export default dynamic(() => Promise.resolve(Post), { ssr: false });