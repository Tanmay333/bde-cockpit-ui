import React, { useEffect, useState } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from '../store/utils/hooks';
import Header from '../components/common/header/Header';
import OrderInfoCard from '../components/orderInfoCard/OrderInfoCard';
import WorkDetails from '../components/orderDetails/OrderDetails';
import Phase from '../components/phase/Phase';
import PhaseDetails from '../components/phaseDetails/PhaseDetails';
import SplashScreen from '../components/splashScreen/SplashScreen';
import styles from './Home.module.scss';

const Home: React.FC = () => {
  const state = useAppSelector((state) => state.machineDetailsSlice.data);
  const history = useHistory();
  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    if (
      state &&
      state.process &&
      state.process.currentPhaseDetails &&
      state.process.currentPhaseDetails.downtimes &&
      state.process.currentPhaseDetails.downtimes.length > 0
    ) {
      const unknownEvent = state.process.currentPhaseDetails.downtimes.find(
        (event) => event.reason === 'unknown',
      );

      if (
        state.process.currentPhaseDetails.state === 'DOWNTIME' ||
        unknownEvent
      ) {
        history.push('/downtimetype');
      }
    }
  }, [state, history]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);
    if (timeLeft === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timeLeft]);
  if (timeLeft !== 0) {
    return <SplashScreen />;
  }

  return (
    <IonPage>
      <Header />
      <IonContent>
        <OrderInfoCard />
        <Phase />
        <div className={styles.details}>
          <WorkDetails />
          <PhaseDetails />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
