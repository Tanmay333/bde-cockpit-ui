import { IonButton, IonRow } from '@ionic/react';
import React from 'react';
import styles from './DowntimeType.module.scss';

const DowntimeType: React.FC = () => {
  return (
    <>
      <div className={styles.title}>
        <p>Downtime</p>
      </div>

      <div>
        <IonRow>
          <IonButton className={styles.button}>Machine issue</IonButton>
          <IonButton className={styles.button}>Lunch Break</IonButton>
          <IonButton className={styles.button}>Sick leave</IonButton>
          <IonButton className={styles.button}>Team meeting </IonButton>
          <IonButton className={styles.button}>Urgent call</IonButton>
        </IonRow>
      </div>
      <div className={styles.endBtn}>
        <IonButton className={styles.end}>End Production</IonButton>
      </div>
    </>
  );
};

export default DowntimeType;
