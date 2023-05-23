import { IonButton, IonContent, IonPage, IonRow } from '@ionic/react';
import React, { useCallback } from 'react';
import styles from './DowntimeType.module.scss';
import Header from '../common/header/Header';
import { useHistory } from 'react-router';
import { useAppSelector } from '../../store/utils/hooks';
import useWebSocket from '../../store/hooks/useWebSocket';

const DowntimeType: React.FC = () => {
  const Downtimereason = [
    {
      reason: 'Machine issue',
    },
    {
      reason: 'Lunch Break',
    },
    {
      reason: 'Sick leave',
    },
    {
      reason: 'Team meeting',
    },
    {
      reason: 'Urgent call',
    },
  ];

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
  const onClick = useCallback(
    (reason) => {
      if (
        phaseState === 'DOWNTIME' &&
        state.process.currentPhaseDetails.downtimes !== null
      ) {
        const message = {
          action: 'saveDowntimeReason',
          downtimeStartTime:
            state.process.currentPhaseDetails.downtimes[0].startTime,
          jobId: jobId,
          downtimeReason: reason,
        };
        sendMessage(message);
        history.push('/');
      }
    },
    [Downtimereason],
  );
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
              {Downtimereason.map((data) => (
                <IonButton
                  onClick={() => onClick(data.reason)}
                  key={data.reason}
                  className={styles.button}
                >
                  {data.reason}
                </IonButton>
              ))}
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
