import { FC } from "react";

import styles from "./NavBar.module.css";

const NavBar: FC = () => {
  return (
    <div className={styles.container}>
      <h1>PTU savings visualizer</h1>
    </div>
  );
};

export default NavBar;
