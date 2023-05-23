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

  //To get total time of all previous phases.
  const previousPhaseTotalTime = () => {
    if (state === null || state.process.previousPhases.length === 0) {
      return '00:00';
    }

    let totalMinutes = 0;

    for (const phase of state.process.previousPhases) {
      const startTime = new Date(phase.startTime);
      const endTime = new Date(phase.endTime);
      const diffInMs = endTime.getTime() - startTime.getTime();
      const diffInMinutes = Math.floor(diffInMs / 60000);
      totalMinutes += diffInMinutes;
    }

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`;
  };

  //To get start time of current phase
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
  const [startTimeOfProcess, setStartTimeOfProcess] = useState('');

  //Adding total time of previous phases and current time minus start time of process
  const totalTimeOfJobProcess = () => {
    const totalTimeOfPreviousPhase = previousPhaseTotalTime();
    const currentStartTime = currentPhaseStartTime();

    if (totalTimeOfPreviousPhase === 'N/A' || currentStartTime === 'N/A') {
      return 'N/A'; // If either value is 'N/A', return 'N/A' as the final result
    }

    const [previousHours, previousMinutes] = totalTimeOfPreviousPhase
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

  //To run the code every five seconds need to be changed to 1 min in future.
  useEffect(() => {
    const interval = setInterval(() => {
      const result = totalTimeOfJobProcess();
      setStartTimeOfProcess(result);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [state]);

  //To get the current phase name
  const currentPhaseName = () => {
    if (state === null) {
      return 'N/A';
    }
    if (state.process.currentPhaseDetails === null) {
      return 'N/A';
    }
    return state.process.currentPhaseDetails.phaseName;
  };

  //To get current phase start time
  const currentPhaseTime = () => {
    if (state === null || state.process.currentPhaseDetails === null) {
      return '00:00';
    }

    const startTime = new Date(state.process.currentPhaseDetails.startTime);
    const currentTime = new Date();

    const timeDiff = currentTime.getTime() - startTime.getTime();
    const diffInMinutes = Math.floor(timeDiff / 60000);
    const hours = Math.floor(diffInMinutes / 60);
    const minutes = diffInMinutes % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`;
  };

  const data = {
    orderId: state === null ? 'N/A' : state.assignedJobDetails.orderId,
    machineStatus:
      state === null ? 'N/A' : state.process.currentPhaseDetails.state,
    startTimeOfCompleteProcess: startTimeOfProcess,
    currentPhaseName: currentPhaseName(),
    currentPhaseTime: currentPhaseTime(),
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
          <IonCardTitle>{data.startTimeOfCompleteProcess} hrs</IonCardTitle>
          <IonCardSubtitle>Today</IonCardSubtitle>
        </div>
        <div>
          <IonCardTitle className={styles.ionRightSection}>
            {data.currentPhaseTime} hrs
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
