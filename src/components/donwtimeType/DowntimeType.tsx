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
  const modalClass = li.length === 0 ? styles.hiddenModal : '';

  // Close the downtime modal
  const closeModal = () => {
    setToggleDowntime(false);
  };

  const openModal = () => {
    setToggleDowntime(true);
  };

  // If machine details are not available, return null
  if (!state) {
    return null;
  }

  // List of Downtime reasons to display in buttons
  const Downtimereason = [
    { id: 'p001', reason: translation.reason.changingBarrel },
    { id: 'p002', reason: translation.reason.changingLabels },
    { id: 'p003', reason: translation.reason.break },
    { id: 'p004', reason: translation.reason.rework },
    { id: 'i001', reason: translation.reason.mechanicalIncident },
    { id: 'i002', reason: translation.reason.electricalIncident },
    { id: 'i003', reason: translation.reason.misuse },
    { id: 'i004', reason: translation.reason.defectiveFillingMaterial },
    { id: 'i005', reason: translation.reason.otherIncident },
    { id: 'i006', reason: translation.reason.incidentLabelMachine },
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
            reason: Downtimereason.map((reasonItem) => reasonItem.id), // Extract reasons from Downtimereason
          };
        });
        setLi(dtRs);
        openModal();
      }
      if (
        state.data.process.currentPhaseDetails.phaseName === 'production' &&
        state.data.process.currentPhaseDetails.state === 'RUNNING' &&
        unknownEvent
      ) {
        openModal();
      }
      if (
        state.data.process.currentPhaseDetails.phaseName === 'production' &&
        !unknownEvent
      ) {
        setLi([]);
        closeModal();
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
      closeModal();
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
      closeModal();
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
    (id: string, startTime: string | null) => {
      if (!state.data.process.currentPhaseDetails.downtimes) {
        return null;
      }
      if (phaseState === 'DOWNTIME' || phaseState === 'RUNNING') {
        const message = {
          action: 'saveDowntimeReason',
          downtimeStartTime: startTime,
          jobId: jobId,
          downtimeReason: id, // Send only the id
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
        className={modalClass}
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
                        {data.reason.slice(0, 4).map((id, i) => (
                          <IonButton
                            onClick={() => onClick(id, data.startTime)}
                            key={i}
                            className={styles.button}
                          >
                            {
                              Downtimereason.find(
                                (reasonItem) => reasonItem.id === id,
                              )?.reason
                            }
                          </IonButton>
                        ))}
                      </div>
                      <div className={styles.spacing}></div>
                      <div className={styles.title}>
                        {translation.text.incident} <br />
                        {data.reason.slice(4).map((id, i) => (
                          <IonButton
                            onClick={() => onClick(id, data.startTime)}
                            key={i}
                            className={styles.button}
                          >
                            {
                              Downtimereason.find(
                                (reasonItem) => reasonItem.id === id,
                              )?.reason
                            }
                          </IonButton>
                        ))}
                      </div>
                      <div>
                        {/* Add a thin line separator */}
                        {index < li.length - 1 && (
                          <hr className={styles.separator} />
                        )}
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
