import React, { useEffect, useRef, useState } from 'react';
import {
  IonPage,
  IonContent,
  IonToggle,
  IonText,
  IonModal,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/utils/hooks';
import Header from '../components/common/header/Header';
import OrderInfoCard from '../components/orderInfoCard/OrderInfoCard';
import WorkDetails from '../components/orderDetails/OrderDetails';
import Phase from '../components/phase/Phase';
import PhaseDetails from '../components/phaseDetails/PhaseDetails';
import SplashScreen from '../components/splashScreen/SplashScreen';
import styles from './Home.module.scss';
import Buttons from '../components/common/buttons/Buttons';
import { toggleMockData } from '../store/slices/mockData.slice';
import { useTranslations } from '../store/slices/translation.slice';
import DowntimeType from '../components/donwtimeType/DowntimeType';

const Home: React.FC = () => {
  const translation = useTranslations();

  const state = useAppSelector((state) => state.machineDetailsSlice.data);
  const toggleMock = useAppSelector((state) => state.mockData.data);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [timeLeft, setTimeLeft] = useState(5);
  const [toggleDowntime, setToggleDowntime] = useState(false);
  const modal = useRef<HTMLIonModalElement>(null);

  const openModal = () => {
    setToggleDowntime(true);
  };

  const closeModal = () => {
    setToggleDowntime(false);
  };

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
        state.process.currentPhaseDetails.phaseName === 'production' &&
        state.process.currentPhaseDetails.state === 'DOWNTIME' &&
        unknownEvent
      ) {
        setToggleDowntime(true);
      }
      if (
        state.process.currentPhaseDetails.phaseName === 'production' &&
        state.process.currentPhaseDetails.state === 'RUNNING' &&
        unknownEvent
      ) {
        setToggleDowntime(true);
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

  const handleToggleChange = (event: any) => {
    dispatch(toggleMockData(event.detail.checked));
  };

  return (
    <>
      <IonPage>
        <Header />
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: 40 }}>
          <IonText>{translation.buttons.toggle}</IonText>
          <IonToggle
            style={{ margin: 20 }}
            checked={toggleMock}
            onIonChange={handleToggleChange}
            color="primary"
          />
        </div>
        <IonContent>
          <OrderInfoCard />
          <Phase />
          <div className={styles.details}>
            <WorkDetails />
            <PhaseDetails />
          </div>
          <Buttons />
          <IonModal
            key="4"
            style={{
              '--border-radius': '0px',
              '--width': '100%',
              '--height': '100%',
            }}
            isOpen={toggleDowntime}
            onIonModalDidDismiss={closeModal}
          >
            <DowntimeType />
          </IonModal>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Home;
