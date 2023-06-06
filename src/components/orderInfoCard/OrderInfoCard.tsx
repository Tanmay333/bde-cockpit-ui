import React, { useEffect, useState } from 'react';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from '@ionic/react';
import styles from './OrderInforCard.module.scss';
import { useAppSelector } from '../../store/utils/hooks';

const OrderInfoCard: React.FC = () => {
  const state = useAppSelector((state) => state.machineDetailsSlice.data);
  const [startTimeOfProcess, setStartTimeOfProcess] = useState('N/A');
  const [currentPhaseTime, setCurrentPhaseTime] = useState('00:00');
  const [currentPhaseName, setCurrentPhaseName] = useState('N/A');

  useEffect(() => {
    const previousPhaseTotalTime = () => {
      if (!state?.process?.previousPhases?.length) {
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

    const currentPhaseStartTime = () => {
      if (!state?.process?.currentPhaseDetails?.startTime) {
        return '00:00';
      }

      const currentTime = new Date();
      const receivedTime = state.process.currentPhaseDetails.startTime
        ? new Date(state.process.currentPhaseDetails.startTime)
        : new Date();

      const timeDifference = currentTime.getTime() - receivedTime.getTime();
      const min = Math.floor(timeDifference / 60000);
      const hrs = Math.floor(min / 60);
      const mins = min % 60;

      return `${hrs.toString().padStart(2, '0')}:${mins
        .toString()
        .padStart(2, '0')}`;
    };

    const totalTimeOfJobProcess = () => {
      const totalTimeOfPreviousPhase = previousPhaseTotalTime();
      const currentStartTime = currentPhaseStartTime();

      if (totalTimeOfPreviousPhase === 'N/A' || currentStartTime === 'N/A') {
        return 'N/A';
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

    const interval = setInterval(() => {
      const result = totalTimeOfJobProcess();
      setStartTimeOfProcess(result);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [state]);

  useEffect(() => {
    const currentPhaseName = () => {
      if (!state?.process?.currentPhaseDetails?.phaseName) {
        return 'N/A';
      }

      return state.process.currentPhaseDetails.phaseName;
    };

    const currentPhaseTime = () => {
      if (!state?.process?.currentPhaseDetails?.startTime) {
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

    const interval = setInterval(() => {
      setCurrentPhaseTime(currentPhaseTime());
      setCurrentPhaseName(currentPhaseName());
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [state]);

  const getPhaseName = () => {
    const phaseName = state?.process?.currentPhaseDetails?.phaseName;

    switch (phaseName) {
      case 'mounting':
        return 'Phase 1';
      case 'preparing':
        return 'Phase 2';
      case 'production':
        return 'Phase 3';
      case 'unmounting':
        return 'Phase 4';
      case 'cleaning':
        return 'Phase 5';
      default:
        return 'Default phase';
    }
  };

  const [data, setData] = useState(() => {
    return {
      orderId: state?.assignedJobDetails?.orderId || 'N/A',
      machineStatus: state?.process?.currentPhaseDetails?.state || 'N/A',
      startTimeOfCompleteProcess: startTimeOfProcess,
      currentPhaseName: currentPhaseName || 'N/A',
      currentPhaseTime: currentPhaseTime || '00:00',
    };
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setData({
        orderId: state?.assignedJobDetails?.orderId || 'N/A',
        machineStatus: state?.process?.currentPhaseDetails?.state || 'N/A',
        startTimeOfCompleteProcess: startTimeOfProcess,
        currentPhaseName: currentPhaseName || 'N/A',
        currentPhaseTime: currentPhaseTime || '00:00',
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [
    state?.assignedJobDetails?.orderId,
    state?.process?.currentPhaseDetails?.state,
    startTimeOfProcess,
    currentPhaseName,
    currentPhaseTime,
  ]);

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
            {getPhaseName()} - {data.currentPhaseName}
          </IonCardSubtitle>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default OrderInfoCard;
