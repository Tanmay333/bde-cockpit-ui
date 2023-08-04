import React, { useEffect, useState } from 'react';
import { IonPage, IonContent, IonToggle, IonText } from '@ionic/react';
import { useAppDispatch, useAppSelector } from '../store/utils/hooks';
import Header from '../components/common/header/Header';
import OrderInfoCard from '../components/orderProcessSummary/OrderProcessSummary';
import WorkDetails from '../components/orderDetails/OrderDetails';
import Phase from '../components/phaseOverview/PhaseOverview';
import PhaseDetails from '../components/phaseDetails/PhaseDetails';
import SplashScreen from '../components/splashScreen/SplashScreen';
import styles from './Home.module.scss';
import Buttons from '../components/common/buttons/Buttons';
// import { toggleMockData } from '../store/slices/mockData.slice';
// import { useTranslations } from '../store/slices/translation.slice';
import DowntimeType from '../components/donwtimeType/DowntimeType';
import StationIds from '../components/common/stationIds/StationID';

const Home: React.FC = () => {
  // const translation = useTranslations();
  // const toggleMock = useAppSelector((state) => state.mockData.data);

  const stationId = useAppSelector((state) => state.StationIdsSlice.value);
  // const dispatch = useAppDispatch();
  const [timeLeft, setTimeLeft] = useState(5);

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

  // const handleToggleChange = (event: any) => {
  //   dispatch(toggleMockData(event.detail.checked));
  // };

  if (stationId === null && timeLeft === 0) {
    return <StationIds />;
  }
  return (
    <>
      <IonPage>
        <Header />
        {/* <div style={{ display: 'flex', alignItems: 'center', marginLeft: 40 }}>
          <IonText>{translation.buttons.toggle}</IonText>
          <IonToggle
            style={{ margin: 20 }}
            checked={toggleMock}
            onIonChange={handleToggleChange}
            color="primary"
          />
        </div> */}
        <IonContent>
          <OrderInfoCard />
          <Phase />
          <div className={styles.details}>
            <WorkDetails />
            <PhaseDetails />
          </div>
          <Buttons />
          <DowntimeType />
        </IonContent>
      </IonPage>
    </>
  );
};

export default Home;
