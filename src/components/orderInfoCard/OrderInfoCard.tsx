import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from '@ionic/react';
import React from 'react';
import styles from './OrderInforCard.module.scss';
import { useAppSelector } from '../../store/utils/hooks';
const OrderInfoCard: React.FC = () => {
  const state = useAppSelector((state) => state.machineDetailsSlice.data);
  const previousPhaseTime = () => {
    if (state === null) {
      return 'N/A';
    }
    if (state.process.previousPhases.length === 0) {
      return 'N/A';
    }
    const startTime = new Date(state.process.previousPhases[0].startTime);
    const endTime = new Date(state.process.previousPhases[0].endTime);
    const diffInMs = endTime.getTime() - startTime.getTime();
    const diffInMinutes = Math.floor(diffInMs / 60000);
    const hours = Math.floor(diffInMinutes / 60);
    const minutes = diffInMinutes % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`;
  };
  const currentPhaseStartTime = () => {
    if (state === null) {
      return 'N/A';
    }
    const startTime = new Date(state.process.currentPhaseDetails.startTime);
    const ms = startTime.getTime();
    const min = Math.floor(ms / 60000);
    const hrs = Math.floor(min / 60);
    const mins = min % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}`;
  };
  const previousPhaseName = () => {
    if (state === null) {
      return 'N/A';
    }
    if (state.process.previousPhases.length === 0) {
      return 'N/A';
    }
    return state.process.previousPhases[0].phaseName;
  };
  const currentPhaseName = () => {
    if (state === null) {
      return 'N/A';
    }
    if (state.process.currentPhaseDetails === null) {
      return 'N/A';
    }
    return state.process.currentPhaseDetails.phaseName;
  };
  const currentPhaseTime = () => {
    if (state === null) {
      return 'N/A';
    }
    if (state.process.currentPhaseDetails === null) {
      return 'N/A';
    }
    return state.process.currentPhaseDetails.startTime;
  };
  const data = {
    orderId: state === null ? 'N/A' : state.assignedJobDetails.orderId,
    machineStatus:
      state === null ? 'N/A' : state.process.currentPhaseDetails.state,
    startTime: currentPhaseStartTime(),
    currentPhaseName: currentPhaseName(),
    currentPhaseTime: currentPhaseTime(),
    previousPhaseTime: previousPhaseTime(),
    previousPhaseName: previousPhaseName(),
  };
  const t = new Date();
  return (
    <IonCard className={styles.orderInfoCard}>
      <IonCardHeader>
        <IonCardTitle>Order: {data.orderId}</IonCardTitle>
        <IonCardSubtitle>
          Machine {data.machineStatus === 'running' ? 'on' : 'off'}
        </IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <div>
          <IonCardTitle>{t.getHours() + ':' + t.getMinutes()} hrs</IonCardTitle>
          <IonCardSubtitle>Today</IonCardSubtitle>
        </div>
        <div>
          <IonCardTitle className={styles.ionRightSection}>
            {data.currentPhaseTime} hrs
          </IonCardTitle>
          <IonCardSubtitle>Phase 01 - {data.currentPhaseName}</IonCardSubtitle>
        </div>
      </IonCardContent>
    </IonCard>
  );
};
export default OrderInfoCard;
