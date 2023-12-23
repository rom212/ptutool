import { FC, ReactNode } from "react";

import styles from "./Main.module.css";

type Props = {
  children: ReactNode;
};

const Main: FC<Props> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default Main;
