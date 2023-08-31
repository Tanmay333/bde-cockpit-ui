// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IonGrid, IonRow, IonCol, IonButton } from '@ionic/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './PhaseOverview.module.scss';
import { useAppSelector } from '../../store/utils/hooks';
import useWebSocket from '../../store/hooks/useWebSocket';
import './PhaseOverview.module.scss';
import { useTranslations } from '../../store/slices/translation.slice';
import FixProgressBar from './FixProgressBar';
import IncrementalProgressBar from './IncrementalProgressBar';

const PhaseOverview: React.FC = () => {
  // For frontend testing purpose
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const translation = useTranslations();
  const state = useAppSelector((state) => state.machineDetailsSlice.data);
  const history = useHistory();
  const { sendMessage } = useWebSocket();
  // For frontend testing purpose
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const stationid = state.data.station.stationId === '1.203.4.245';

  // States and useEffect to control the visibility and color of different phases
  const [showPhase1, setShowPhase1] = useState('#333333');
  const [showPhase2, setShowPhase2] = useState('#E0E0E0');
  const [showPhase3, setShowPhase3] = useState('#E0E0E0');
  const [showPhase4, setShowPhase4] = useState('#E0E0E0');
  const [showPhase5, setShowPhase5] = useState('#E0E0E0');

  const [phaseOne, setPhaseOne] = useState('#E0E0E0');
  const [phaseTwo, setPhaseTwo] = useState('#E0E0E0');

  const [phaseFour, setPhaseFour] = useState('#E0E0E0');
  const [phaseFive, setPhaseFive] = useState('#E0E0E0');

  // useEffect to determine the current phase and set the visibility of phase name  and color accordingly
  useEffect(() => {
    if (state === null || state === undefined) {
      return setPhaseOne('#E0E0E0');
    }
    const hasMountingPhase =
      state.data.process &&
      state.data.process.previousPhases &&
      state.data.process.previousPhases.some(
        (phase) => phase.phaseName === 'mounting',
      );

    if (
      state.data.process &&
      state.data.process.currentPhaseDetails &&
      (state.data.process.currentPhaseDetails.phaseName === 'mounting' ||
        hasMountingPhase)
    ) {
      setPhaseOne('#2799D1');
      setShowPhase1('#333333');
      setShowPhase2('#E0E0E0');
      setShowPhase3('#E0E0E0');
      setShowPhase4('#E0E0E0');
      setShowPhase5('#E0E0E0');
      setPhaseTwo('#E0E0E0');
      setPhaseFour('#E0E0E0');
      setPhaseFive('#E0E0E0');
    }

    const hasPreparationPhase =
      state.data.process &&
      state.data.process.previousPhases &&
      state.data.process.previousPhases.some(
        (phase) => phase.phaseName === 'preparing',
      );

    if (
      (state.data.process &&
        state.data.process.currentPhaseDetails &&
        state.data.process.currentPhaseDetails.phaseName === 'preparing') ||
      hasPreparationPhase
    ) {
      setShowPhase1('#E0E0E0');
      setShowPhase2('#333333');
      setShowPhase3('#E0E0E0');
      setShowPhase4('#E0E0E0');
      setShowPhase5('#E0E0E0');
      setPhaseTwo('#2799D1');
      setPhaseFour('#E0E0E0');
      setPhaseFive('#E0E0E0');
    }
    const hasProductionPhase =
      state.data.process &&
      state.data.process.previousPhases &&
      state.data.process.previousPhases.some(
        (phase) => phase.phaseName === 'production',
      );

    if (
      (state.data.process &&
        state.data.process.currentPhaseDetails &&
        state.data.process.currentPhaseDetails.phaseName === 'production') ||
      hasProductionPhase
    ) {
      setShowPhase3('#333333');
      setShowPhase4('#E0E0E0');
      setShowPhase5('#E0E0E0');
      setShowPhase2('#E0E0E0');
      setShowPhase1('#E0E0E0');
      setPhaseFour('#E0E0E0');
      setPhaseFive('#E0E0E0');
    }
    const hasCleaningPhase =
      state.data.process &&
      state.data.process.previousPhases &&
      state.data.process.previousPhases.some(
        (phase) => phase.phaseName === 'cleaning',
      );

    if (
      (state.data.process &&
        state.data.process.currentPhaseDetails &&
        state.data.process.currentPhaseDetails.phaseName === 'cleaning') ||
      hasCleaningPhase
    ) {
      setShowPhase5('#E0E0E0');
      setShowPhase4('#333333');
      setShowPhase3('#E0E0E0');
      setShowPhase1('#E0E0E0');
      setShowPhase2('#E0E0E0');
      setPhaseFive('#E0E0E0');
      setPhaseFour('#2799D1');
    }
    const hasUnMountingPhase =
      state.data.process &&
      state.data.process.previousPhases &&
      state.data.process.previousPhases.some(
        (phase) => phase.phaseName === 'unmounting',
      );
    if (
      (state.data.process &&
        state.data.process.currentPhaseDetails &&
        state.data.process.currentPhaseDetails.phaseName === 'unmounting') ||
      hasUnMountingPhase
    ) {
      setShowPhase3('#E0E0E0');
      setShowPhase5('#333333');
      setShowPhase1('#E0E0E0');
      setShowPhase2('#E0E0E0');

      setShowPhase4('#E0E0E0');
      setPhaseFive('#2799D1');
    }
  }, [state]);

  // Additional useEffect to handle the start of a new order
  const startorder = useAppSelector((state) => state.startneworderslice);

  useEffect(() => {
    if (startorder === null || startorder === undefined) {
      return;
    }
    // If a new order is started, reset the phase colors and visibility
    if (startorder && startorder.data === true) {
      {
        setPhaseOne('#E0E0E0');
        setPhaseTwo('#E0E0E0');
        setPhaseFour('#E0E0E0');
        setPhaseFive('#E0E0E0');
        setShowPhase1('#333333');
        setShowPhase2('#E0E0E0');
        setShowPhase3('#E0E0E0');
        setShowPhase4('#E0E0E0');
        setShowPhase5('#E0E0E0');
      }
    }
  }, [startorder]);

  const onClickPhase4 = useCallback(() => {
    history.push('/');
  }, [history]);

  const onClickPhase5 = useCallback(() => {
    history.push('/');
  }, [history]);

  if (state === null || state === undefined) {
    return null;
  }

  const jobId = state && state.data.assignedJobDetails.jobId;

  // For frontend testing purpose
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const startProduction = useCallback(() => {
    if (jobId === null) {
      return null;
    }
    const message = {
      action: 'startProduction',
      jobId: jobId,
    };
    sendMessage(message);
  }, [jobId]);

  // For frontend testing purpose
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const startDowntime = useCallback(() => {
    const message = {
      action: 'toggleDowntime',
      jobId: jobId,
    };
    sendMessage(message);

    history.push('/');
  }, [jobId]);

  return (
    <IonGrid className={styles.container}>
      <IonCol>
        <IonGrid>
          {/* For frontend testing purpose */}
          {/* {stationid && (
            <>
              <IonButton onClick={startProduction}>
                {translation.buttons.production}
              </IonButton>
              <IonButton onClick={startDowntime}>
                {translation.buttons.downTime}
              </IonButton>
            </>
          )} */}
          <IonRow>
            <div
              className={styles.idle}
              style={{
                color: showPhase1,
              }}
            >
              <p>{translation.description.mounting}</p>
            </div>
            <div
              className={styles.idle}
              style={{
                color: showPhase2,
              }}
            >
              <p>{translation.description.preparing}</p>
            </div>
            <div
              className={styles.working}
              style={{
                color: showPhase3,
              }}
            >
              <p>{translation.description.production}</p>
            </div>
            <div
              className={styles.idle}
              style={{
                color: showPhase4,
              }}
            >
              <p>{translation.description.cleaning}</p>
            </div>
            <div
              className={styles.idle}
              style={{
                color: showPhase5,
              }}
            >
              <p>{translation.description.unmounting}</p>
            </div>
          </IonRow>
          <IonRow style={{ flexWrap: 'nowrap' }}>
            <div
              className={styles.boxidle}
              id="phase-one"
              style={{
                backgroundColor: phaseOne,
              }}
            ></div>

            <div
              className={styles.boxidle}
              id={'phase 2'}
              style={{
                backgroundColor: phaseTwo,
              }}
            ></div>
            {state.data.process.currentPhaseDetails.phaseName ===
              'production' && <IncrementalProgressBar />}
            {state.data.process.currentPhaseDetails.phaseName !==
              'production' && <FixProgressBar />}
            <div
              className={styles.boxidle}
              onClick={onClickPhase4}
              style={{
                background: phaseFour,
              }}
            ></div>
            <div
              className={styles.boxidle}
              onClick={onClickPhase5}
              style={{
                background: phaseFive,
              }}
            ></div>
          </IonRow>
        </IonGrid>
      </IonCol>
    </IonGrid>
  );
};

export default PhaseOverview;
