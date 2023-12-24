import { FC } from "react";

import styles from "./NavBar.module.css";

const NavBar: FC = () => {
  return (
    <div className={styles.container}>
      <h1>PTU/PAYGO Price Comparison Tool</h1>
      <p>
        This tool provides directional estimates for comparison purposes only.
        This is not a quote.
      </p>
    </div>
  );
};

export default NavBar;
