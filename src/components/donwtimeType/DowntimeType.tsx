import { IonButton, IonContent, IonPage, IonRow } from '@ionic/react';
import React from 'react';
import styles from './DowntimeType.module.scss';
import Header from '../common/header/Header';

const DowntimeType: React.FC = () => {
  return (
    <IonPage>
      <Header />
      <IonContent>
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
          <IonButton className={styles.end} href="/">
            End Production
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default DowntimeType;
