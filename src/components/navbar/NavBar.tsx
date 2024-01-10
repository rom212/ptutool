import { FC } from "react";

import styles from "./NavBar.module.css";

const NavBar: FC = () => {
  return (
    <div className={styles.container}>
      <h1>PTU-M / PAYGO Cost Comparison Tool</h1>
      <p>
        This tool provides directional estimates only for comparison purposes
        between PTU Managed and PayGo Azure Open AI. This is not a quote.
      </p>
    </div>
  );
};

export default NavBar;
