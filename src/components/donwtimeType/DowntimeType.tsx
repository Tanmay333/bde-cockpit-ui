import { IonButton, IonContent, IonPage, IonRow } from '@ionic/react';
import React, { useCallback } from 'react';
import styles from './DowntimeType.module.scss';
import Header from '../common/header/Header';
import { useHistory } from 'react-router';
import { useAppSelector } from '../../store/utils/hooks';
import useWebSocket from '../../store/hooks/useWebSocket';

const DowntimeType: React.FC = () => {
  const history = useHistory();
  const { sendMessage } = useWebSocket();
  const state = useAppSelector((state) => state.machineDetailsSlice.data);
  if (state === null) {
    return null;
  }
  const phaseState = state.process.currentPhaseDetails.state;

  const jobId = state.assignedJobDetails.jobId;
  const onEndProduction = useCallback(() => {
    const message = {
      action: 'setEndOfProduction',
      jobId: jobId,
    };
    sendMessage(message);
    history.push('/');
  }, [history]);
  const onClick = useCallback(() => {
    if (
      phaseState === 'DOWNTIME' &&
      state.process.currentPhaseDetails.downtimes !== null
    ) {
      const message = {
        action: 'saveDowntimeReason',
        downtimeStartTime:
          state.process.currentPhaseDetails.downtimes[0].startTime,
        jobId: jobId,
        downtimeReason: 'machine issue',
      };
      sendMessage(message);
      history.push('/');
    }
  }, []);
  return (
    <IonPage>
      <Header />
      <IonContent>
        <div className={styles.statement}>
          <div className={styles.title}>
            <p>Downtime</p>
          </div>
          <div>
            <IonRow className={styles.classes}>
              <IonButton onClick={onClick} className={styles.button}>
                Machine issue
              </IonButton>
              <IonButton className={styles.button}>Lunch Break</IonButton>
              <IonButton className={styles.button}>Sick leave</IonButton>
              <IonButton className={styles.button}>Team meeting </IonButton>
              <IonButton className={styles.button}>Urgent call</IonButton>
            </IonRow>
          </div>
          <div className={styles.endBtn}>
            <IonButton className={styles.end} onClick={onEndProduction}>
              End Production
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default DowntimeType;
