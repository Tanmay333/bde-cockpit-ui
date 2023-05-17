import { IonGrid, IonRow, IonCol, IonModal } from '@ionic/react';
import React, { useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Phase.module.scss';

const Phase: React.FC = () => {
  const [downTime, setDownType] = useState(false);
  const modal = useRef<HTMLIonModalElement>(null);
  const history = useHistory();

  const [showPhase1, setShowPhase1] = useState(true);
  const [showPhase2, setShowPhase2] = useState(false);
  const [showPhase3, setShowPhase3] = useState(false);
  const [showPhase4, setShowPhase4] = useState(false);
  const [showPhase5, setShowPhase5] = useState(false);

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
  }, [phaseTwo, history]);

  const onClickPhase3 = useCallback(() => {
    setShowPhase3(true);
    setShowPhase2(false);
    setPhaseThree('#2AD127');
    setDownType(false);
  }, [phaseThree, history]);

  const onClickPhase4 = useCallback(() => {
    setShowPhase3(false);
    setShowPhase4(true);
    setPhaseFour('#2799D1');
    history.push('/');
  }, [phaseFour, history]);

  const onClickPhase5 = useCallback(() => {
    setShowPhase5(true);
    setShowPhase4(false);
    setPhaseFive('#2799D1');
    history.push('/');
  }, [phaseFive, history]);

  return (
    <IonGrid className={styles.container}>
      <IonCol>
        <IonGrid>
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
              //onClick={onClick}
              style={{
                backgroundColor: '#E0E0E0',
                //backgroundColor: bgColor,
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

            <div
              className={styles.boxworking}
              style={{
                backgroundColor: phaseThree,
                // transition: 'all 20s ease',
              }}
              onClick={onClickPhase3}
            ></div>

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
