import { FC, useContext, useEffect, useState } from 'react';
import { authenticate, getTwitterClient } from '@/services/twitter';
import useStorage from 'hooks/useStorage'
import { useRouter } from 'next/router'
import Connect from "components/Connect";
import styles from "@/styles/Home.module.css";
import dynamic from "next/dynamic";
import { IClientOAuth2UserClient, IParsedOAuth2TokenResult, TwitterApi } from 'twitter-api-v2';


const Client: FC = () => {

  const router = useRouter()
  const code = router.query.code;
  // if (typeof code !== "string"){
  //   console.log("undefined/incorrect code in request");
  //   return <div>Incorrect code</div>;
  // }
    
  const { getItem, setItem } = useStorage();
  const codeVerifier = getItem("codeVerifier");

  useEffect(() => {
    if (code && codeVerifier) {
      getTwitterClient(code, codeVerifier)
      .then(response => {
        setItem('bearerToken', response.data);
        window.location.href = "/twitter/post"
      });
    } 
  }, [code, codeVerifier])

  return (
    <div className={styles.container}>
      logging in...
    </div>
  );
}

// export default Client;
export default dynamic(() => Promise.resolve(Client), { ssr: false });