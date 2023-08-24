import React, { useCallback, useEffect, useRef, useState } from 'react';
import { IonButton, IonContent, IonModal, IonRow } from '@ionic/react';
import { useHistory } from 'react-router';
import useWebSocket from '../../store/hooks/useWebSocket';
import styles from './DowntimeType.module.scss';
import Header from '../common/header/Header';
import { useAppSelector } from '../../store/utils/hooks';
import { useTranslations } from '../../store/slices/translation.slice';
import { formatDownTime } from '../../store/utils/formatDownTime';
import LoadingIndicator from '../common/loadingIndicator/LoadingIndicator';

const DowntimeType: React.FC = () => {
  const translation = useTranslations();
  const [toggleDowntime, setToggleDowntime] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const modal = useRef<HTMLIonModalElement>(null);
  const [isLoadingDowntime, setIsLoadingDowntime] = useState(false);
  const [isLoadingEndProduction, setIsLoadingEndProduction] = useState(false);
  const history = useHistory();
  const { sendMessage } = useWebSocket();
  const state = useAppSelector((state) => state.machineDetailsSlice.data);
  const [li, setLi] = useState<
    { startTime: string | null; reason: string[] }[]
  >([]);

  // Close the downtime modal
  const closeModal = () => {
    setToggleDowntime(false);
  };

  // If machine details are not available, return null
  if (!state) {
    return null;
  }

  // List of Downtime reasons to display in buttons
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

  // useEffect to handle downtime toggling and displaying of downtime reasons
  useEffect(() => {
    if (
      state &&
      state.data.process &&
      state.data.process.currentPhaseDetails &&
      state.data.process.currentPhaseDetails.downtimes &&
      state.data.process.currentPhaseDetails.downtimes.length > 0
    ) {
      const unknownEvent =
        state.data.process.currentPhaseDetails.downtimes.find(
          (event) => event.reason === 'unknown',
        );
      if (
        state.data.process.currentPhaseDetails.phaseName === 'production' &&
        unknownEvent
      ) {
        const dt = state.data.process.currentPhaseDetails.downtimes;
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
        state.data.process.currentPhaseDetails.phaseName === 'production' &&
        state.data.process.currentPhaseDetails.state === 'RUNNING' &&
        unknownEvent
      ) {
        setToggleDowntime(true);
      }
      if (
        state.data.process.currentPhaseDetails.phaseName === 'production' &&
        !unknownEvent
      ) {
        setLi([]);
        setToggleDowntime(false);
      }
    }
  }, [state]);

  useEffect(() => {
    if (
      state &&
      state.data.process &&
      state.data.process.currentPhaseDetails &&
      state.data.process.currentPhaseDetails.phaseName !== 'production'
    ) {
      setLi([]);
      setToggleDowntime(false);
    }
  }, [state]);

  // Define phaseState and jobId variables
  const phaseState = state.data.process.currentPhaseDetails.state;
  const jobId = state.data.assignedJobDetails.jobId;

  // Function for ending production
  const onEndProduction = useCallback(() => {
    const message = {
      action: 'setEndOfProduction',
      jobId: jobId,
    };
    sendMessage(message);
    setIsLoadingEndProduction(true);
  }, [jobId, sendMessage, history]);

  useEffect(() => {
    if (state.data.process.currentPhaseDetails.phaseName === 'cleaning') {
      setIsLoadingEndProduction(false);
      history.push('/');
      setToggleDowntime(false);
      setLi([]);
    }
  }, [history, state]);
  // For frontend testing purpose
  // Function for starting downtime
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const startDowntime = useCallback(() => {
    const message = {
      action: 'toggleDowntime',
      jobId: jobId,
    };
    sendMessage(message);
    history.push('/');
  }, [jobId, sendMessage, history]);

  // Onclick function when a downtime reason button is clicked
  const onClick = useCallback(
    (reason: string, startTime: string | null) => {
      if (!state.data.process.currentPhaseDetails.downtimes) {
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
      setIsLoadingDowntime(true);
    },
    [state, phaseState, li],
  );

  // useEffect to check if known downtime event exists and stop loading spinner
  useEffect(() => {
    if (
      state &&
      state.data.process &&
      state.data.process.currentPhaseDetails &&
      state.data.process.currentPhaseDetails.downtimes &&
      state.data.process.currentPhaseDetails.downtimes.length > 0
    ) {
      const knownEvent = state.data.process.currentPhaseDetails.downtimes.find(
        (event) => event.reason !== 'unknown',
      );

      if (
        state.data.process.currentPhaseDetails.phaseName === 'production' &&
        knownEvent
      ) {
        setIsLoadingDowntime(false);
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
                      {/*...Display downtime details and buttons...*/}
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
                        {translation.text.incident} <br />
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
                {/* Loading spinner */}
                {isLoadingDowntime && <LoadingIndicator />}
                {isLoadingEndProduction && <LoadingIndicator />}
              </IonRow>
            </div>
            <div className={styles.endBtn}>
              {/* For frontend testing purpose */}
              {/* {stationid && (
                <IonButton onClick={startDowntime}>
                  {translation.buttons.downTime}
                </IonButton>
              )} */}
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
