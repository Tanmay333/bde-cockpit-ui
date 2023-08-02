import { IonButton, IonContent, IonPage, IonRow } from '@ionic/react';
import { useCallback } from 'react';
import useWebSocket from '../../../store/hooks/useWebSocket';
import { useHistory } from 'react-router';
import { useAppDispatch } from '../../../store/utils/hooks';
import Header from '../header/Header';
import { StationIdsData } from '../../../store/slices/stationIdSlice';
import styles from './StationID.module.scss';

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

  return (
    <>
      <IonPage>
        <IonContent>
          <Header />
          <div className={styles.para}>Please select the Station ID</div>
          <br />
          <IonRow className={styles.container}>
            <IonButton className={styles.text} onClick={onClickPoc}>
              Poc Station{' '}
            </IonButton>
            <IonButton className={styles.text} onClick={onClickMock}>
              Mock Station
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
