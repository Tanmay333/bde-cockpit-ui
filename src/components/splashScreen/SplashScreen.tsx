import {} from '@ionic/react';
import React from 'react';
import styles from './SplashScreen.module.scss';
import SplashscreenLogo from '../../static/assets/images/SplashscreenLogo.svg';

const SplashScreen: React.FC = () => {
  return (
    <>
      <div className={styles.Splash}>
        <img src={SplashscreenLogo} alt={'Splashscreen Logo'} />
      </div>
    </>
  );
};

export default SplashScreen;
