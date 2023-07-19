import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { IonButton, IonContent, IonModal, IonRow } from '@ionic/react';
import { useHistory } from 'react-router';
import useWebSocket from '../../store/hooks/useWebSocket';
import styles from './DowntimeType.module.scss';
import Header from '../common/header/Header';
import { useAppSelector } from '../../store/utils/hooks';
import { useTranslations } from '../../store/slices/translation.slice';

const DowntimeType: React.FC = () => {
  const translation = useTranslations();
  const [toggleDowntime, setToggleDowntime] = useState(false);
  const modal = useRef<HTMLIonModalElement>(null);

  const openModal = () => {
    setToggleDowntime(true);
  };

  const closeModal = () => {
    setToggleDowntime(false);
  };

  const Downtimereason = [
    {
      reason: translation.reason.changingBarrel,
    },
    {
      reason: translation.reason.changingLabels,
    },
    {
      reason: translation.reason.break,
    },

    {
      reason: translation.reason.mechanicalIncident,
    },
    {
      reason: translation.reason.electricalIncident,
    },
    {
      reason: translation.reason.misuse,
    },
    {
      reason: translation.reason.defectiveFillingMaterial,
    },
    {
      reason: translation.reason.otherIncident,
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
    setToggleDowntime(false);
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
      history.push('/');
      setToggleDowntime(false);
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

    const hoursFormat = hours < 10 ? `0${hours}` : hours;
    const minutesFormat = minutes < 10 ? `0${minutes}` : minutes;
    const secondsFormat = seconds < 10 ? `0${seconds}` : seconds;

    const formattedTime = `${hoursFormat}:${minutesFormat}:${secondsFormat}`;
    return formattedTime;
  }, []);

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
    }
  }, [state, history]);

  return (
    <>
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
        <Header />
        <IonContent>
          <div className={styles.statement}>
            <div className={styles.title}>
              <p>
                {translation.text.downtimeAt} {downTimesData}
              </p>
            </div>
            <div>
              <IonRow className={styles.classes}>
                {Downtimereason.slice(0, 3).map((data) => (
                  <IonButton
                    onClick={() => onClick(data.reason)}
                    key={data.reason}
                    className={styles.button}
                  >
                    {data.reason}
                  </IonButton>
                ))}
              </IonRow>

              <div className={styles.spacing}></div>

              <IonRow className={styles.classes}>
                {Downtimereason.slice(3).map((data) => (
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
                {translation.buttons.endProduction}
              </IonButton>
            </div>
          </div>
        </IonContent>
      </IonModal>
    </>
  );
};

export default DowntimeType;
