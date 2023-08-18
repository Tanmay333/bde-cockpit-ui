import React, { useEffect, useMemo, useState } from 'react';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from '@ionic/react';
import styles from './OrderProcessSummary.module.scss';
import { useAppSelector } from '../../store/utils/hooks';
import { useTranslations } from '../../store/slices/translation.slice';
import Green from '../../static/assets/images/Green.svg';
import Red from '../../static/assets/images/Red.svg';
import { formatDate } from '../../store/utils/formatTime';
import ProductionVsDowntime from './ProductionVsDowntime';

const OrderProcessSummary: React.FC = () => {
  const translation = useTranslations();
  const [startTimeOfProcess, setStartTimeOfProcess] = useState('N/A');
  const [currentPhaseTime, setCurrentPhaseTime] = useState('00:00');
  const [currentPhaseName, setCurrentPhaseName] = useState('N/A');
  const state = useAppSelector((state) => state.machineDetailsSlice.data);
  const previousPhase = useAppSelector(
    (state) => state.machineDetailsSlice.data.process.previousPhases,
  );

  const isPhaseProduction = useMemo(() => {
    if (state?.process?.currentPhaseDetails) {
      return (
        state.process.currentPhaseDetails.phaseName === 'production' &&
        state.process.currentPhaseDetails.state === 'RUNNING'
      );
    }
    return false;
  }, [state]);

  const isStateDowntime = useMemo(() => {
    if (state?.process?.currentPhaseDetails) {
      return (
        state.process.currentPhaseDetails.phaseName === 'production' &&
        state.process.currentPhaseDetails.state === 'DOWNTIME'
      );
    }
    return false;
  }, [state]);

  // useEffect for calculating total time of previous phases and current phase start time
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
      const currentTime = () => {
        if (
          state?.process.currentPhaseDetails.endTime !== null &&
          state?.process.currentPhaseDetails.phaseName === 'cleaning'
        ) {
          const endTime = state.process.currentPhaseDetails.endTime
            ? new Date(state.process.currentPhaseDetails.endTime)
            : new Date();
          return endTime;
        } else return new Date();
      };
      const receivedTime = state.process.currentPhaseDetails.startTime
        ? new Date(state.process.currentPhaseDetails.startTime)
        : new Date();

      const timeDifference = currentTime().getTime() - receivedTime.getTime();

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
      const currentPhaseName = state?.process?.currentPhaseDetails?.phaseName;
      const currentPhaseState = state?.process?.currentPhaseDetails?.state;

      if (totalTimeOfPreviousPhase === 'N/A' || currentStartTime === 'N/A') {
        return 'N/A';
      }

      if (
        currentPhaseName === 'unmounting' &&
        currentPhaseState === 'FINISHED'
      ) {
        return startTimeOfProcess; // Don't update if unmounting and finished
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

      return `${finalHours.toString().padStart(2, '0')} ${' '} ${
        translation.text.hrs
      } ${finalMinutes.toString().padStart(2, '0')} ${' '} ${
        translation.text.min
      }`;
    };

    const interval = setInterval(() => {
      const result = totalTimeOfJobProcess();
      setStartTimeOfProcess(result);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [state]);

  // useEffect for calculating the time depending on current phase name
  useEffect(() => {
    const currentPhaseName = () => {
      if (!state?.process?.currentPhaseDetails?.phaseName) {
        return 'NA';
      }
      return state.process.currentPhaseDetails.phaseName;
    };

    const currentPhaseTime = () => {
      if (!state?.process?.currentPhaseDetails?.startTime) {
        return `00 ${translation.text.hrs} 00 ${translation.text.min}`;
      }
      const startTime = new Date(state.process.currentPhaseDetails.startTime);
      const currentTime = new Date();

      const timeDiff = currentTime.getTime() - startTime.getTime();
      const diffInMinutes = Math.floor(timeDiff / 60000);
      const hours = Math.floor(diffInMinutes / 60);
      const minutes = diffInMinutes % 60;
      return `${hours.toString().padStart(2, '0')} ${
        translation.text.hrs
      } ${minutes.toString().padStart(2, '0')} ${translation.text.min}`;
    };
    const interval = setInterval(() => {
      setCurrentPhaseTime(currentPhaseTime());
      setCurrentPhaseName(currentPhaseName());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [state]);

  // Function to get the corresponding phase name for display
  const getPhaseName = () => {
    const phaseName = state?.process?.currentPhaseDetails?.phaseName;

    switch (phaseName) {
      case 'mounting':
        return 'Phase 1';
      case 'preparing':
        return 'Phase 2';
      case 'production':
        return 'Phase 3';
      case 'cleaning':
        return 'Phase 4';
      case 'unmounting':
        return 'Phase 5';
      default:
        return 'Phase';
    }
  };

  const [data, setData] = useState(() => {
    return {
      stationId: state.stationId || 'N/A',
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
        stationId: state.stationId || 'N/A',
        orderId: state?.assignedJobDetails?.orderId || 'N/A',
        machineStatus: state?.process?.currentPhaseDetails?.state || 'N/A',
        startTimeOfCompleteProcess: startTimeOfProcess,
        currentPhaseName: currentPhaseName || 'N/A',
        currentPhaseTime: currentPhaseTime || '00:00',
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [
    state?.assignedJobDetails?.orderId,
    state?.process?.currentPhaseDetails?.state,
    startTimeOfProcess,
    currentPhaseName,
    currentPhaseTime,
  ]);

  const isPhasePreparing =
    state &&
    state.process &&
    state.process.currentPhaseDetails &&
    state.process.currentPhaseDetails.state === 'FINISHED';

  const station = useMemo(() => {
    return state === null ? 'N/A' : state.station.mainSpeed;
  }, [state]);

  const mountingPhase =
    state &&
    state.process.previousPhases.find(
      (phase) => phase.phaseName === 'mounting',
    );

  // Function to get the start time or "Not started" message
  const getStart = () => {
    // if (state && state.process.currentPhaseDetails.state === 'FINISHED') {
    //   return translation.text.notStarted;
    // } else
    if (mountingPhase) {
      return `${translation.text.startedAt} ${formatDate(
        previousPhase[0].startTime,
      )}`;
    } else if (
      state &&
      state.process.currentPhaseDetails.phaseName === 'mounting'
    )
      return `${translation.text.startedAt} ${formatDate(
        state.process.currentPhaseDetails.startTime,
      )}`;
    return translation.text.notStarted;
  };

  // Function to get the image source based on the current phase state
  const getImageSource = () => {
    if (isPhaseProduction) {
      return Green;
    } else if (isStateDowntime) {
      return Red;
    } else {
      return Red;
    }
  };

  return (
    <IonCard className={styles.orderInfoCard}>
      <IonCardHeader className={styles.property}>
        <IonCardTitle>
          <img src={getImageSource()} alt={'status'} />{' '}
          {translation.text.station}: {data.stationId}
          <IonCardSubtitle className={styles.speed}>
            {translation.text.machineSpeed}: {station} {translation.text.ppm}
          </IonCardSubtitle>
        </IonCardTitle>
        <div>
          <IonCardTitle>
            {getPhaseName()} - {translation.description[data.currentPhaseName]}
          </IonCardTitle>
          {!isPhasePreparing && (
            <IonCardSubtitle className={styles.ionRightSection}>
              {data.currentPhaseTime}
            </IonCardSubtitle>
          )}
          {isPhasePreparing && (
            <IonCardSubtitle className={styles.ionRightSection}>
              00 {translation.text.hrs} 00 {translation.text.min}
            </IonCardSubtitle>
          )}
        </div>
      </IonCardHeader>
      <IonCardContent>
        <div>
          <IonCardTitle>{data.startTimeOfCompleteProcess}</IonCardTitle>
          <IonCardSubtitle>{getStart()}</IonCardSubtitle>
        </div>
        <div className={styles.right}>
          {state.process.currentPhaseDetails.phaseName === 'production' && (
            <ProductionVsDowntime />
          )}
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default OrderProcessSummary;
