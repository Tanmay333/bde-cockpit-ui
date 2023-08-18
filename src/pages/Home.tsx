/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { useAppSelector } from '../store/utils/hooks';
import Header from '../components/common/header/Header';
import OrderInfoCard from '../components/orderProcessSummary/OrderProcessSummary';
import WorkDetails from '../components/orderDetails/OrderDetails';
import Phase from '../components/phaseOverview/PhaseOverview';
import PhaseDetails from '../components/phaseDetails/PhaseDetails';
import SplashScreen from '../components/splashScreen/SplashScreen';
import styles from './Home.module.scss';
import Buttons from '../components/common/buttons/Buttons';
import DowntimeType from '../components/donwtimeType/DowntimeType';
import StationIds from '../components/common/stationIds/StationID';

const Home: React.FC = () => {
  // Get the stationId from the Redux store
  const stationId = useAppSelector((state) => state.StationIdsSlice.value);
  // Set up state to handle countdown timer
  const [timeLeft, setTimeLeft] = useState(5);

  const [isEndCleaning, setIsEndCleaning] = useState(false); // New state for Buttons loading
  const [isEndUnmounting, setIsEndUnmounting] = useState(false); // New state for Buttons loading

  // useEffect to decrement the timeLeft every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);
    if (timeLeft === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timeLeft]);
  // If the countdown is not finished yet, show the SplashScreen
  if (timeLeft !== 0) {
    return <SplashScreen />;
  }

  // If stationId is not set and countdown is finished, show the StationIds component
  if (stationId === null && timeLeft === 0) {
    return <StationIds />;
  }
  return (
    <>
      <IonPage>
        <Header />
        <IonContent>
          <OrderInfoCard />
          <Phase />
          <div className={styles.details}>
            <WorkDetails />
            <PhaseDetails />
          </div>
          <Buttons
            setIsEndCleaning={setIsEndCleaning}
            setIsEndUnmounting={setIsEndUnmounting}
          />
          <DowntimeType />
        </IonContent>
      </IonPage>
    </>
  );
};

export default Home;
