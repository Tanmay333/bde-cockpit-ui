import {} from '@ionic/react';
import React, { useEffect } from 'react';
import styles from './SplashScreen.module.scss';
import SplashscreenLogo from '../../static/assets/images/SplashscreenLogo.svg';
import { getMachineDetails } from '../../store/slices/machineDetailsSlice';
import { useAppDispatch } from '../../store/utils/hooks';

const SplashScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getMachineDetails({}));
  }, [dispatch]);
  return (
    <>
      <div className={styles.splash}>
        <img
          className={styles.img}
          src={SplashscreenLogo}
          alt={'Splashscreen Logo'}
        />
      </div>
    </>
  );
};

export default SplashScreen;
