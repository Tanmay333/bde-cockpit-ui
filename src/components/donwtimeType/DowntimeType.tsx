import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  IonButton,
  IonContent,
  IonLoading,
  IonModal,
  IonRow,
} from '@ionic/react';
import { useHistory } from 'react-router';
import useWebSocket from '../../store/hooks/useWebSocket';
import styles from './DowntimeType.module.scss';
import Header from '../common/header/Header';
import { useAppSelector } from '../../store/utils/hooks';
import { useTranslations } from '../../store/slices/translation.slice';
import { formatDownTime } from '../../store/utils/formatDownTime';

const DowntimeType: React.FC = () => {
  const translation = useTranslations();
  const [toggleDowntime, setToggleDowntime] = useState(false);
  const modal = useRef<HTMLIonModalElement>(null);
  const toggleMock = useAppSelector((state) => state.mockData.data);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const { sendMessage } = useWebSocket();
  const state = useAppSelector((state) => state.machineDetailsSlice.data);
  const [li, setLi] = useState<
    { startTime: string | null; reason: string[] }[]
  >([]);

  const closeModal = () => {
    setToggleDowntime(false);
  };

  if (!state) {
    return null;
  }
  const Downtimereason = [
    translation.reason.changingBarrel,
    translation.reason.changingLabels,
    translation.reason.break,
    translation.reason.mechanicalIncident,
    translation.reason.electricalIncident,
    translation.reason.misuse,
    translation.reason.defectiveFillingMaterial,
    translation.reason.otherIncident,
  ];

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
        unknownEvent
      ) {
        const dt = state.process.currentPhaseDetails.downtimes;
        const filteredData = dt.filter((obj) => obj.reason === 'unknown');
        const dtRs = filteredData.map((data) => {
          return {
            startTime: data.startTime,
            reason: Downtimereason,
          };
        });
        setLi(dtRs);
        setToggleDowntime(true);
      }
      if (
        state.process.currentPhaseDetails.phaseName === 'production' &&
        state.process.currentPhaseDetails.state === 'RUNNING' &&
        unknownEvent
      ) {
        setToggleDowntime(true);
      }
      if (
        state.process.currentPhaseDetails.phaseName === 'production' &&
        !unknownEvent
      ) {
        setLi([]);
        setToggleDowntime(false);
      }
    }
  }, [state]);

  const phaseState = state.process.currentPhaseDetails.state;
  const jobId = state.assignedJobDetails.jobId;
  const onEndProduction = useCallback(() => {
    const message = {
      action: 'setEndOfProduction',
      jobId: jobId,
    };
    sendMessage(message);
    history.push('/');
    setLi([]);
    setToggleDowntime(false);
  }, [jobId, sendMessage, history]);

  const startDowntime = useCallback(() => {
    const message = {
      action: 'toggleDowntime',
      jobId: jobId,
    };
    sendMessage(message);
    history.push('/');
  }, [jobId, sendMessage, history]);

  const onClick = useCallback(
    (reason: string, startTime: string | null) => {
      if (!state.process.currentPhaseDetails.downtimes) {
        return null;
      }
      if (phaseState === 'DOWNTIME' || phaseState === 'RUNNING') {
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
      setIsLoading(true);
    },
    [state, phaseState, li],
  );

  useEffect(() => {
    if (
      state &&
      state.process &&
      state.process.currentPhaseDetails &&
      state.process.currentPhaseDetails.downtimes &&
      state.process.currentPhaseDetails.downtimes.length > 0
    ) {
      const knownEvent = state.process.currentPhaseDetails.downtimes.find(
        (event) => event.reason !== 'unknown',
      );

      if (
        state.process.currentPhaseDetails.phaseName === 'production' &&
        knownEvent
      ) {
        setIsLoading(false);
      }
    }
  }, [state]);

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
            <div>
              <IonRow className={styles.classes}>
                {li &&
                  li.map((data, index) => (
                    <div key={index}>
                      <div className={styles.title}>
                        <p>
                          {translation.text.downtimeAt}
                          {formatDownTime(data.startTime)}
                        </p>
                      </div>
                      <div className={styles.title}>
                        {translation.text.plannedDowntime}
                        <br />
                        {data.reason.slice(0, 3).map((value, i) => (
                          <IonButton
                            onClick={() => onClick(value, data.startTime)}
                            key={i}
                            className={styles.button}
                          >
                            {value}
                          </IonButton>
                        ))}
                      </div>
                      <div className={styles.spacing}></div>
                      <div className={styles.title}>
                        {translation.text.forcedDowntime} <br />
                        {data.reason.slice(3).map((value, i) => (
                          <IonButton
                            onClick={() => onClick(value, data.startTime)}
                            key={i}
                            className={styles.button}
                          >
                            {value}
                          </IonButton>
                        ))}
                      </div>
                    </div>
                  ))}
                <IonLoading
                  isOpen={isLoading}
                  spinner="circles"
                  //message="Please wait..."
                  cssClass={styles.ionloading}
                />
              </IonRow>
            </div>
            <div className={styles.endBtn}>
              {!toggleMock && (
                <IonButton onClick={startDowntime}>
                  {translation.buttons.downTime}
                </IonButton>
              )}
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