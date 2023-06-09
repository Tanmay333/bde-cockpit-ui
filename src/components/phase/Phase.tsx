import { IonGrid, IonRow, IonCol, IonModal, IonButton } from '@ionic/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Phase.module.scss';
import { useAppSelector } from '../../store/utils/hooks';
import useWebSocket from '../../store/hooks/useWebSocket';
import './Phase.module.scss';
import ProgressBar from './ProgressBar';

const Phase: React.FC = () => {
  const state = useAppSelector((state) => state.machineDetailsSlice.data);
  const [downTime, setDownType] = useState(false);
  const modal = useRef<HTMLIonModalElement>(null);
  const history = useHistory();

  const [showPhase1, setShowPhase1] = useState(true);
  const [showPhase2, setShowPhase2] = useState(false);
  const [showPhase3, setShowPhase3] = useState(false);
  const [showPhase4, setShowPhase4] = useState(false);
  const [showPhase5, setShowPhase5] = useState(false);

  const [phaseOne, setPhaseOne] = useState('#E0E0E0');
  const [phaseTwo, setPhaseTwo] = useState('#E0E0E0');
  const [phaseThree, setPhaseThree] = useState('#E0E0E0');
  const [phaseFour, setPhaseFour] = useState('#E0E0E0');
  const [phaseFive, setPhaseFive] = useState('#E0E0E0');

  const onClickDowntime = useCallback(() => {
    history.push('/downtimetype');
  }, [history]);

  const onClickPhase2 = useCallback(() => {
    setShowPhase1(false);
    setShowPhase2(true);
    setPhaseTwo('#2799D1');
    history.push('/SelectWorkers');
  }, [history]);

  const onClickPhase3 = useCallback(() => {
    setDownType(false);
  }, [history]);

  const currentPhaseName = () => {
    if (state === null || state === undefined) {
      return 'N/A';
    }
    if (state.process.currentPhaseDetails === null) {
      return 'N/A';
    }
    return state.process.currentPhaseDetails.phaseName;
  };

  const phaseState = () => {
    if (state === null || state === undefined) {
      return 'N/A';
    }
    if (state.process.currentPhaseDetails === null) {
      return 'N/A';
    }
    return state.process.currentPhaseDetails.state;
  };

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
      setPhaseTwo('#2799D1');
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
      setShowPhase2(false);
      //setPhaseThree('#2AD127');
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
      setShowPhase4(true);
      setPhaseFour('#2799D1');
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
      setShowPhase5(true);
      setShowPhase4(false);
      setPhaseFive('#2799D1');
    }
    if (
      state.process &&
      state.process.currentPhaseDetails &&
      state.process.currentPhaseDetails.state === null
    ) {
      setPhaseOne('#E0E0E0');
      setPhaseTwo('#E0E0E0');
      // setPhaseThree('#E0E0E0');
      setPhaseFour('#E0E0E0');
      setPhaseFive('#E0E0E0');
      setShowPhase1(true);
      setShowPhase2(false);
      setShowPhase3(false);
      setShowPhase4(false);
      setShowPhase5(false);
    }
  }, [currentPhaseName, phaseState, state]);

  const onClickPhase4 = useCallback(() => {
    history.push('/');
  }, [history]);

  const onClickPhase5 = useCallback(() => {
    history.push('/');
  }, [history]);

  const { sendMessage } = useWebSocket();

  if (state === null || state === undefined) {
    return null;
  }

  const jobId = state.assignedJobDetails.jobId;
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
  }, [history]);

  return (
    <IonGrid className={styles.container}>
      <IonCol>
        <IonGrid>
          <IonButton onClick={startProduction}>Production</IonButton>
          <IonButton onClick={startDowntime}>DownTime</IonButton>
          <IonRow>
            <div className={styles.idle}>{showPhase1 && <p>Phase 01</p>}</div>
            <div className={styles.idle}>{showPhase2 && <p>Phase 02</p>}</div>
            <div className={styles.working}>
              {showPhase3 && <p>Phase 03</p>}
              <button onClick={onClickDowntime}>Downtime</button>
              <IonModal
                style={{
                  '--width': '100%',
                  '--height': '100%',
                }}
                ref={modal}
                isOpen={downTime}
              ></IonModal>
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
              onClick={onClickPhase2}
              style={{
                backgroundColor: phaseTwo,
              }}
            ></div>
            <ProgressBar />
            {/* <div
              className={styles.boxworking}
              style={{
                backgroundColor: phaseThree,
              }}
              onClick={onClickPhase3}
            ></div> */}

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

export default Phase;
