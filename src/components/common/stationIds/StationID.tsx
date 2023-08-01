import { IonButton, IonContent, IonPage, IonRow } from '@ionic/react';
import { useCallback, useEffect, useState } from 'react';
import useWebSocket from '../../../store/hooks/useWebSocket';
import { useHistory } from 'react-router';
import { useAppDispatch } from '../../../store/utils/hooks';
import Header from '../header/Header';
import SplashScreen from '../../splashScreen/SplashScreen';
import { StationIdsData } from '../../../store/slices/stationIdSlice';

const StationIds: React.FC = () => {
  const { sendMessage, isConnected } = useWebSocket();
  const history = useHistory();
  const dispatch = useAppDispatch();

  const onClickPoc = useCallback(() => {
    dispatch(StationIdsData('poc_station'));
    sessionStorage.setItem('stationId', 'poc_station');
    const message = {
      action: 'getCurrentProductionState',
      stationId: 'poc_station',
    };
    sendMessage(message);
    history.push('/');
  }, [isConnected, sendMessage, history]);

  const onClickMock = useCallback(() => {
    dispatch(StationIdsData('1.203.4.245'));
    sessionStorage.setItem('stationId', '1.203.4.245');

    const message = {
      action: 'getCurrentProductionState',
      stationId: '1.203.4.245',
    };

    sendMessage(message);

    history.push('/');
  }, [isConnected, sendMessage, history]);

  const onClickTest = useCallback(() => {
    dispatch(StationIdsData('test_station'));
    sessionStorage.setItem('stationId', 'test_station');

    const message = {
      action: 'getCurrentProductionState',
      stationId: 'test_station',
    };

    sendMessage(message);

    history.push('/');
  }, [isConnected, sendMessage, history]);

  return (
    <>
      <IonPage>
        <IonContent>
          <Header />
          <IonRow>
            <IonButton onClick={onClickPoc}>Poc</IonButton>
            <IonButton onClick={onClickMock}>Mock</IonButton>
            <IonButton onClick={onClickTest}>Test</IonButton>
          </IonRow>
        </IonContent>
      </IonPage>
    </>
  );
};

export default StationIds;
