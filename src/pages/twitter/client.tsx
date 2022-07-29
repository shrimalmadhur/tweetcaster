import { FC, useContext, useEffect, useState } from 'react';
import type {
    GetServerSideProps,
    InferGetServerSidePropsType,
    NextPage,
  } from 'next'

import { authenticate, getTwitterClient } from '@/services/twitter';
import useStorage from 'hooks/useStorage'
import { redirect } from 'next/dist/server/api-utils';
import exp from 'constants';
import { useRouter } from 'next/router'
import Connect from "components/Connect";
import styles from "@/styles/Home.module.css";
import dynamic from "next/dynamic";


const Client: FC = () => {

  const router = useRouter()
  const code = router.query.code;

  const [client, setClient] = useState()
  

  const { getItem } = useStorage();
  const codeVerifier = getItem("codeVerifier");

  useEffect(() => {
    if (code && codeVerifier) {
      getTwitterClient(code, codeVerifier)
        .then(response => {
          setClient(response.data)
        })
    } 
  }, [code, codeVerifier])

  return (
    <div className={styles.container}>
      <Connect></Connect>
      {client ? "logged in": "not logged in"}
    </div>
  );
}

// export default Client;
export default dynamic(() => Promise.resolve(Client), { ssr: false });