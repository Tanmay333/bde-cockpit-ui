import styles from "./Header.module.scss";
import LohnpackLogo from "../../../static/assets/images/LohnpackLogo.svg";
import PSITechnicsLogo from "../../../static/assets/images/PSILogo.svg";
import SmartdingsLogo from "../../../static/assets/images/SmartdingsLogo.svg";

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img src={LohnpackLogo} alt={"lohnpack logo"} />
        <img src={PSITechnicsLogo} alt={"psi logo"} />
        <img src={SmartdingsLogo} alt={"smartdings logo"} />
      </div>
    </div>
  );
};

export default Header;
