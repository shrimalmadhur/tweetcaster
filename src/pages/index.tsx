import { FC, useContext } from "react";
import dynamic from "next/dynamic";

import styles from "@/styles/Home.module.css";
import Twitter from "components/Twitter";
import Connect from "components/Connect";

const Home: FC = () => {
  return (
    <div className={styles.container}>
      {/* <Twitter></Twitter> */}
      <Connect></Connect>
    </div>
  );
};

// export default Home
export default dynamic(() => Promise.resolve(Home), { ssr: false });
