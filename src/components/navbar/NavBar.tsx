import { FC } from "react";

import styles from "./NavBar.module.css";

const NavBar: FC = () => {
  return (
    <div className={styles.container}>
      <h1>PTU/PAYGO Price Comparison Tool</h1>
    </div>
  );
};

export default NavBar;
