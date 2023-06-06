import React, { useCallback, useMemo } from 'react';
import { IonButton, IonContent, IonPage, IonRow } from '@ionic/react';
import { useHistory } from 'react-router';
import useWebSocket from '../../store/hooks/useWebSocket';
import styles from './DowntimeType.module.scss';
import Header from '../common/header/Header';
import { useAppSelector } from '../../store/utils/hooks';

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

  if (!state) {
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
  }, [sendMessage, jobId, history]);

  const onClick = useCallback(
    (reason: string) => {
      if (!state.process.currentPhaseDetails.downtimes) {
        return null;
      }

      const unknownEvent = state.process.currentPhaseDetails.downtimes.find(
        (event) => event.reason === 'unknown',
      );

      if (phaseState === 'DOWNTIME' && unknownEvent) {
        const { startTime } = unknownEvent;

        const message = {
          action: 'saveDowntimeReason',
          downtimeStartTime: startTime,
          jobId: jobId,
          downtimeReason: reason,
        };
        sendMessage(message);
        history.push('/');
      }

      // For testing purpose only
      const message = {
        action: 'toggleDowntime',
        jobId: jobId,
      };
      sendMessage(message);

      history.push('/');
    },
    [state, phaseState, sendMessage, jobId, history],
  );
  const downTimesData = useMemo(() => {
    if (!state.process.currentPhaseDetails.downtimes) {
      return null;
    }

    const unknownEvent = state.process.currentPhaseDetails.downtimes.find(
      (event) => event.reason === 'unknown',
    );
    if (unknownEvent === undefined || unknownEvent.startTime === null) {
      return null;
    }
    const dateObj = new Date(unknownEvent.startTime);

    // Get the hours, minutes, and seconds from the Date object
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const seconds = dateObj.getSeconds();

    // Format the time as a string
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    return formattedTime;
  }, []);

  return (
    <IonPage>
      <Header />
      <IonContent>
        <div className={styles.statement}>
          <div className={styles.title}>
            <p>Downtime at {downTimesData}</p>
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
