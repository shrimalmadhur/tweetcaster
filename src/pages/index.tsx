import { FC, useContext } from "react";
import dynamic from "next/dynamic";

import styles from "@/styles/Home.module.css";
import Twitter from "components/Twitter";

const Home: FC = () => {
  return (
    <div className={styles.container}>
      <Twitter></Twitter>
    </div>
  );
};

// export default Home
export default dynamic(() => Promise.resolve(Home), { ssr: false });
