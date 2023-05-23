import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import styles from './OrderInforCard.module.scss';
import { useAppSelector } from '../../store/utils/hooks';
const OrderInfoCard: React.FC = () => {
  const state = useAppSelector((state) => state.machineDetailsSlice.data);
  const previousPhaseTime = () => {
    if (state === null) {
      return '00:00';
    }
    if (state.process.previousPhases.length === 0) {
      return '00:00';
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
      return '00:00';
    }

    const currentTime = new Date(); // Get the current time
    const receivedTime = new Date(state.process.currentPhaseDetails.startTime); // Get the received time
    const timeDifference = currentTime.getTime() - receivedTime.getTime(); // Calculate the time difference in milliseconds

    const min = Math.floor(timeDifference / 60000);
    const hrs = Math.floor(min / 60);
    const mins = min % 60;

    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}`;
  };
  const [currentTime, setCurrentTime] = useState('');

  const totalTimeOfJob = () => {
    const previousTime = previousPhaseTime();
    const currentStartTime = currentPhaseStartTime();

    if (previousTime === 'N/A' || currentStartTime === 'N/A') {
      return 'N/A'; // If either value is 'N/A', return 'N/A' as the final result
    }

    const [previousHours, previousMinutes] = previousTime
      .split(':')
      .map(Number);
    const [currentHours, currentMinutes] = currentStartTime
      .split(':')
      .map(Number);

    const totalHours = previousHours + currentHours;
    const totalMinutes = previousMinutes + currentMinutes;

    const finalHours = totalHours + Math.floor(totalMinutes / 60);
    const finalMinutes = totalMinutes % 60;

    return `${finalHours.toString().padStart(2, '0')}:${finalMinutes
      .toString()
      .padStart(2, '0')}`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const result = totalTimeOfJob();
      setCurrentTime(result);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [state]);
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
      return '00:00';
    }
    if (state.process.currentPhaseDetails === null) {
      return '00:00';
    }
    return state.process.currentPhaseDetails.startTime;
  };
  const data = {
    orderId: state === null ? 'N/A' : state.assignedJobDetails.orderId,
    machineStatus:
      state === null ? 'N/A' : state.process.currentPhaseDetails.state,
    startTime: currentTime,
    currentPhaseName: currentPhaseName(),
    currentPhaseTime: currentPhaseTime(),
    previousPhaseTime: previousPhaseTime(),
    previousPhaseName: previousPhaseName(),
  };

  const [phase, setPhase] = useState('Default phase');

  useEffect(() => {
    if (state === null) {
      return setPhase('N/A');
    }
    if (state.process.currentPhaseDetails.phaseName === 'mounting') {
      return setPhase('Phase 1');
    } else if (state.process.currentPhaseDetails.phaseName === 'preparing') {
      return setPhase('Phase 2');
    } else if (state.process.currentPhaseDetails.phaseName === 'production') {
      return setPhase('Phase 3');
    } else if (state.process.currentPhaseDetails.phaseName === 'unmounting') {
      return setPhase('Phase 4');
    } else if (state.process.currentPhaseDetails.phaseName === 'cleaning') {
      return setPhase('Phase 5');
    }
  }, [currentPhaseName]);
  return (
    <IonCard className={styles.orderInfoCard}>
      <IonCardHeader>
        <IonCardTitle>Order: {data.orderId}</IonCardTitle>
        <IonCardSubtitle>
          Machine {data.machineStatus === 'RUNNING' ? 'on' : 'off'}
        </IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <div>
          <IonCardTitle>{data.startTime} hrs</IonCardTitle>
          <IonCardSubtitle>Today</IonCardSubtitle>
        </div>
        <div>
          <IonCardTitle className={styles.ionRightSection}>
            {data.previousPhaseTime} hrs
          </IonCardTitle>
          <IonCardSubtitle>
            {phase} - {data.currentPhaseName}
          </IonCardSubtitle>
        </div>
      </IonCardContent>
    </IonCard>
  );
};
export default OrderInfoCard;
