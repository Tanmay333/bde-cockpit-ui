import { IonGrid, IonRow, IonCol, IonModal } from '@ionic/react';
import React, { useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
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

  const onClick = useCallback(
    (event) => {
      console.log(event.target.id);
      if (event.target.id === 'phase 1') {
        setBgColor('#2799D1');
      } else if (event.target.id === 'phase 2') {
        setBgColor('#2799D1');
      }
    },
    [bgColor],
  );

  const handleClick = useCallback(() => {
    setBgColor('#2799D1');
    history.push('/SelectWorkers');
  }, [bgColor]);

  return (
    <IonGrid className={styles.container}>
      <IonCol>
        <IonGrid>
          <IonRow style={{ flexWrap: 'nowrap' }}>
            <div
              id={'phase 1'}
              onClick={onClick}
              //onClick={handleClick}
              style={{
                height: '39px',
                width: '10%',
                //background: '#E0E0E0',
                backgroundColor: bgColor,
                borderRadius: '5px',
                margin: '3px',
              }}
            ></div>
            {/* <a href="/SelectWorkers"> */}
            <div
              id={'phase 2'}
              onClick={onClick}
              style={{
                height: '39px',
                width: '10%',
                //background: '#E0E0E0',
                backgroundColor: bgColor,
                borderRadius: '5px',
                margin: '3px',
              }}
            ></div>
            {/* </a> */}
            {/* <a href="/DowntimeType"> */}
            <div
              style={{
                height: '39px',
                width: '60%',
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
              style={{
                height: '39px',
                width: '10%',
                background: '#E0E0E0',
                borderRadius: '5px',
                margin: '3px',
              }}
            ></div>
            <div
              style={{
                height: '39px',
                width: '10%',
                background: '#E0E0E0',
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
