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
  const translation = useTranslations();
  const state = useAppSelector((state) => state.machineDetailsSlice.data);
  const toggleMock = useAppSelector((state) => state.mockData.data);
  const history = useHistory();
  const { sendMessage } = useWebSocket();

  // States and useEffect to control the visibility and color of different phases
  const [showPhase1, setShowPhase1] = useState(true);
  const [showPhase2, setShowPhase2] = useState(false);
  const [showPhase3, setShowPhase3] = useState(false);
  const [showPhase4, setShowPhase4] = useState(false);
  const [showPhase5, setShowPhase5] = useState(false);

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
      state.process &&
      state.process.previousPhases &&
      state.process.previousPhases.some(
        (phase) => phase.phaseName === 'mounting',
      );

    if (
      state.process &&
      state.process.currentPhaseDetails &&
      (state.process.currentPhaseDetails.phaseName === 'mounting' ||
        hasMountingPhase)
    ) {
      setPhaseOne('#2799D1');
      setShowPhase1(true);
      setShowPhase2(false);
      setShowPhase3(false);
      setShowPhase4(false);
      setShowPhase5(false);
      setPhaseTwo('#E0E0E0');
      setPhaseFour('#E0E0E0');
      setPhaseFive('#E0E0E0');
    }

    const hasPreparationPhase =
      state.process &&
      state.process.previousPhases &&
      state.process.previousPhases.some(
        (phase) => phase.phaseName === 'preparing',
      );

    if (
      (state.process &&
        state.process.currentPhaseDetails &&
        state.process.currentPhaseDetails.phaseName === 'preparing') ||
      hasPreparationPhase
    ) {
      setShowPhase1(false);
      setShowPhase2(true);
      setShowPhase3(false);
      setShowPhase4(false);
      setShowPhase5(false);
      setPhaseTwo('#2799D1');
      setPhaseFour('#E0E0E0');
      setPhaseFive('#E0E0E0');
    }
    const hasProductionPhase =
      state.process &&
      state.process.previousPhases &&
      state.process.previousPhases.some(
        (phase) => phase.phaseName === 'production',
      );

    if (
      (state.process &&
        state.process.currentPhaseDetails &&
        state.process.currentPhaseDetails.phaseName === 'production') ||
      hasProductionPhase
    ) {
      setShowPhase3(true);
      setShowPhase4(false);
      setShowPhase5(false);
      setShowPhase2(false);
      setShowPhase1(false);
      setPhaseFour('#E0E0E0');
      setPhaseFive('#E0E0E0');
    }
    const hasCleaningPhase =
      state.process &&
      state.process.previousPhases &&
      state.process.previousPhases.some(
        (phase) => phase.phaseName === 'cleaning',
      );

    if (
      (state.process &&
        state.process.currentPhaseDetails &&
        state.process.currentPhaseDetails.phaseName === 'cleaning') ||
      hasCleaningPhase
    ) {
      setShowPhase5(false);
      setShowPhase4(true);
      setShowPhase3(false);
      setShowPhase1(false);
      setShowPhase2(false);
      setPhaseFive('#E0E0E0');
      setPhaseFour('#2799D1');
    }
    const hasUnMountingPhase =
      state.process &&
      state.process.previousPhases &&
      state.process.previousPhases.some(
        (phase) => phase.phaseName === 'unmounting',
      );
    if (
      (state.process &&
        state.process.currentPhaseDetails &&
        state.process.currentPhaseDetails.phaseName === 'unmounting') ||
      hasUnMountingPhase
    ) {
      setShowPhase3(false);
      setShowPhase5(true);
      setShowPhase1(false);
      setShowPhase2(false);

      setShowPhase4(false);
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
        setShowPhase1(true);
        setShowPhase2(false);
        setShowPhase3(false);
        setShowPhase4(false);
        setShowPhase5(false);
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

  const jobId = state && state.assignedJobDetails.jobId;
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
          {toggleMock ? null : (
            <>
              <IonButton onClick={startProduction}>
                {translation.buttons.production}
              </IonButton>
              <IonButton onClick={startDowntime}>
                {translation.buttons.downTime}
              </IonButton>
            </>
          )}
          <IonRow>
            <div className={styles.idle}>{showPhase1 && <p>Phase 01</p>}</div>
            <div className={styles.idle}>{showPhase2 && <p>Phase 02</p>}</div>
            <div className={styles.working}>
              {showPhase3 && <p>Phase 03</p>}
            </div>
            <div className={styles.idle}>{showPhase4 && <p>Phase 04</p>}</div>
            <div className={styles.idle}>{showPhase5 && <p> Phase 05</p>}</div>
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
            {state.process.currentPhaseDetails.phaseName === 'production' && (
              <IncrementalProgressBar />
            )}
            {state.process.currentPhaseDetails.phaseName !== 'production' && (
              <FixProgressBar />
            )}
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
