import { IonButton, IonContent, IonPage, IonRow } from '@ionic/react';
import { useCallback, useEffect, useState } from 'react';
import useWebSocket from '../../../store/hooks/useWebSocket';
import { useHistory } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../../store/utils/hooks';
import Header from '../header/Header';
import { StationIdsData } from '../../../store/slices/stationId.slice';
import styles from './StationID.module.scss';
import { useTranslations } from '../../../store/slices/translation.slice';
import LoadingIndicator from '../loadingIndicator/LoadingIndicator';

// StationIds component
const StationIds: React.FC = () => {
  const { sendMessage, isConnected } = useWebSocket();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const translation = useTranslations();
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle click event for POC Station button
  const onClickPoc = useCallback(() => {
    dispatch(StationIdsData('poc_station'));
    sessionStorage.setItem('stationId', 'poc_station');
    const message = {
      action: 'getCurrentProductionState',
      stationId: 'poc_station',
    };
    sendMessage(message);
    setIsLoading(true);
    //history.push('/');
  }, [isConnected, sendMessage, history]);

  // Function to handle click event for Mock Station button
  const onClickMock = useCallback(() => {
    dispatch(StationIdsData('1.203.4.245'));
    sessionStorage.setItem('stationId', '1.203.4.245');
    const message = {
      action: 'getCurrentProductionState',
      stationId: '1.203.4.245',
    };
    sendMessage(message);
    setIsLoading(true);
    //history.push('/');
  }, [isConnected, sendMessage, history]);

  // Function to handle click event for test Station button
  // const onClickTest = useCallback(() => {
  //   dispatch(StationIdsData('test_station'));
  //   sessionStorage.setItem('stationId', 'test_station');
  //   const message = {
  //     action: 'getCurrentProductionState',
  //     stationId: 'test_station',
  //   };
  //   sendMessage(message);
  //   history.push('/');
  // }, [isConnected, sendMessage, history]);

  const state = useAppSelector((state) => state.machineDetailsSlice.data);

  useEffect(() => {
    if (state.data.station.stationId !== null) {
      setIsLoading(false);
      history.push('/');
    }
  }, [history, state]);

  return (
    <>
      <IonPage>
        <IonContent>
          {/* Render the Header component */}
          <Header />
          {/* Loading spinner */}
          {isLoading && <LoadingIndicator />}
          <div className={styles.para}>{translation.text.stationId}</div>
          <br />
          <IonRow className={styles.container}>
            <IonButton className={styles.text} onClick={onClickPoc}>
              {translation.buttons.pocStation}{' '}
            </IonButton>
            <IonButton className={styles.text} onClick={onClickMock}>
              {translation.buttons.mockStation}
            </IonButton>
            {/* <IonButton className={styles.text} onClick={onClickTest}>
              Test Station
            </IonButton> */}
          </IonRow>
        </IonContent>
      </IonPage>
    </>
  );
};

export default StationIds;
