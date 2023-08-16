import styles from './Header.module.scss';
import LohnpackLogo from '../../../static/assets/images/LohnpackLogo.svg';

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img src={LohnpackLogo} alt={'lohnpack logo'} />
      </div>
    </div>
  );
};

export default Header;
