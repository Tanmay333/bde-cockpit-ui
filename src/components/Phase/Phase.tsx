import { IonGrid, IonRow, IonCol, IonModal } from '@ionic/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styles from './Phase.module.scss';

const Phase: React.FC = () => {
  const [downTime, setDownType] = useState(false);

  const modal = useRef<HTMLIonModalElement>(null);
  const history = useHistory();

  const onDownTimeComplete = useCallback(() => {
    history.push('/downtimetype');
    setDownType(false);
  }, [history]);

  const [bgColor, setBgColor] = useState('#E0E0E0');

  const onClick = useCallback(() => {
    setBgColor('#2799D1');
    history.push('/');
  }, [bgColor, history]);

  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(getphaseDetails(bgColor));
  // }, [dispatch, setBgColor]);

  const [phaseTwo, setPhaseTwo] = useState('#E0E0E0');

  const handleClick = useCallback(() => {
    setPhaseTwo('#2799D1');
    history.push('/SelectWorkers');
  }, [phaseTwo, history]);

  const [phaseFour, setPhaseFour] = useState('#E0E0E0');

  const FourClick = useCallback(() => {
    setPhaseFour('#2799D1');
    history.push('/');
  }, [phaseFour, history]);

  const [phaseFive, setPhaseFive] = useState('#E0E0E0');

  const FiveClick = useCallback(() => {
    setPhaseFive('#2799D1');
    history.push('/');
  }, [phaseFive, history]);

  const location = useLocation();
  const changeColor = location.state || {};

  return (
    <IonGrid className={styles.container}>
      <IonCol>
        <IonGrid>
          <IonRow style={{ flexWrap: 'nowrap' }}>
            <div
              id={'phase 1'}
              onClick={onClick}
              style={{
                height: '39px',
                width: '14%',
                backgroundColor: bgColor,
                //backgroundColor: changeColor ? 'blue' : 'gey',
                borderRadius: '5px',
                margin: '3px',
              }}
            ></div>

            <div
              id={'phase 2'}
              onClick={handleClick}
              style={{
                height: '39px',
                width: '14%',
                backgroundColor: phaseTwo,
                borderRadius: '5px',
                margin: '3px',
              }}
            ></div>

            <div
              style={{
                height: '39px',
                width: '44%',
                background: '#2AD127',
                borderRadius: '5px',
                margin: '3px',
              }}
              onClick={onDownTimeComplete}
            ></div>
            <IonModal
              style={{
                '--width': '100%',
                '--height': '100%',
              }}
              ref={modal}
              isOpen={downTime}
            ></IonModal>
            <div
              onClick={FourClick}
              style={{
                height: '39px',
                width: '14%',
                background: phaseFour,
                borderRadius: '5px',
                margin: '3px',
              }}
            ></div>
            <div
              onClick={FiveClick}
              style={{
                height: '39px',
                width: '14%',
                background: phaseFive,
                borderRadius: '5px',
                margin: '3px',
              }}
            ></div>
          </IonRow>
        </IonGrid>
      </IonCol>
    </IonGrid>
  );
};

export default Phase;
