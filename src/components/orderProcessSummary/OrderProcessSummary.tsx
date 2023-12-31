import React, { useEffect, useMemo, useState } from 'react';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
} from '@ionic/react';
import styles from './OrderProcessSummary.module.scss';
import { useAppSelector } from '../../store/utils/hooks';
import { useTranslations } from '../../store/slices/translation.slice';
import { ellipse } from 'ionicons/icons';
import { formatDate } from '../../store/utils/formatTime';
import ProductionVsDowntime from './ProductionVsDowntime';

const OrderProcessSummary: React.FC = () => {
  const translation = useTranslations();
  const [startTimeOfProcess, setStartTimeOfProcess] = useState('N/A');
  const [currentPhaseTime, setCurrentPhaseTime] = useState('00:00 h');
  const [orderSummary, setOrderSummary] = useState('00:00 h');
  const [currentPhaseName, setCurrentPhaseName] = useState('N/A');
  const state = useAppSelector((state) => state.machineDetailsSlice.data);
  const previousPhase = useAppSelector(
    (state) => state.machineDetailsSlice.data.data.process.previousPhases,
  );

  const isPhaseProduction = useMemo(() => {
    if (state?.data.process?.currentPhaseDetails) {
      return (
        state.data.process.currentPhaseDetails.phaseName === 'production' &&
        state.data.process.currentPhaseDetails.state === 'RUNNING'
      );
    }
    return false;
  }, [state]);

  const isStateDowntime = useMemo(() => {
    if (state?.data.process?.currentPhaseDetails) {
      return (
        state.data.process.currentPhaseDetails.phaseName === 'production' &&
        state.data.process.currentPhaseDetails.state === 'DOWNTIME'
      );
    }
    return false;
  }, [state]);

  // useEffect for calculating total time of previous phases and current phase start time
  useEffect(() => {
    const previousPhaseTotalTime = () => {
      if (!state?.data.process?.previousPhases?.length) {
        return '00:00';
      }

      let totalMinutes = 0;

      for (const phase of state.data.process.previousPhases) {
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
      if (!state?.data.process?.currentPhaseDetails?.startTime) {
        return '00:00';
      }
      const currentTime = () => {
        if (
          state?.data.process.currentPhaseDetails.endTime !== null &&
          state?.data.process.currentPhaseDetails.phaseName === 'cleaning'
        ) {
          const endTime = state.data.process.currentPhaseDetails.endTime
            ? new Date(state.data.process.currentPhaseDetails.endTime)
            : new Date();
          return endTime;
        } else return new Date();
      };
      const receivedTime = state.data.process.currentPhaseDetails.startTime
        ? new Date(state.data.process.currentPhaseDetails.startTime)
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
      const currentPhaseName =
        state?.data.process?.currentPhaseDetails?.phaseName;
      const currentPhaseState = state?.data.process?.currentPhaseDetails?.state;

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

      return `${finalHours.toString().padStart(2, '0')}:${finalMinutes
        .toString()
        .padStart(2, '0')}${' '}${translation.text.hrs}`;
    };

    const interval = setInterval(() => {
      const result = totalTimeOfJobProcess();
      setStartTimeOfProcess(result);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [state]);

  useEffect(() => {
    const totalStartTimeOfMounting = () => {
      const currentPhaseName =
        state?.data.process?.currentPhaseDetails?.phaseName;
      const currentPhaseState = state?.data.process?.currentPhaseDetails?.state;

      if (
        currentPhaseName === 'unmounting' &&
        currentPhaseState === 'FINISHED'
      ) {
        return orderSummary; // Don't update if unmounting and finished
      }
      if (mountingPhase) {
        const startTime = new Date(mountingPhase.startTime);
        const currentTime = new Date();
        const timeDifference = currentTime.getTime() - startTime.getTime();
        const diffInMinutes = Math.floor(timeDifference / 60000);
        const hours = Math.floor(diffInMinutes / 60);
        const minutes = diffInMinutes % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes
          .toString()
          .padStart(2, '0')} h`;
      }

      return '00:00 h';
    };
    const interval = setInterval(() => {
      const result = totalStartTimeOfMounting();
      setOrderSummary(result);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [state]); // Include mountingPhase in the dependency array

  // useEffect for calculating the time depending on current phase name
  useEffect(() => {
    const currentPhaseName = () => {
      if (!state?.data.process?.currentPhaseDetails?.phaseName) {
        return 'NA';
      }
      return state.data.process.currentPhaseDetails.phaseName;
    };

    const currentPhaseTime = () => {
      if (!state?.data.process?.currentPhaseDetails?.startTime) {
        return `00:00 ${translation.text.hrs}`;
      }

      if (state?.data.process?.currentPhaseDetails?.state === 'FINISHED') {
        // Phase is finished, show the end time
        return `${data.currentPhaseTime}`;
      }
      const startTime = new Date(
        state.data.process.currentPhaseDetails.startTime,
      );
      const currentTime = new Date();

      const timeDiff = currentTime.getTime() - startTime.getTime();
      const diffInMinutes = Math.floor(timeDiff / 60000);
      const hours = Math.floor(diffInMinutes / 60);
      const minutes = diffInMinutes % 60;
      return `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')} ${translation.text.hrs}`;
    };
    const interval = setInterval(() => {
      setCurrentPhaseTime(currentPhaseTime());
      setCurrentPhaseName(currentPhaseName());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [state]);

  const [data, setData] = useState(() => {
    return {
      stationId: state.data.stationId || 'N/A',
      orderId: state?.data.assignedJobDetails?.orderId || 'N/A',
      machineStatus: state?.data.process?.currentPhaseDetails?.state || 'N/A',
      startTimeOfCompleteProcess: startTimeOfProcess,
      currentPhaseName: currentPhaseName || 'N/A',
      currentPhaseTime: currentPhaseTime || '00:00',
      orderSummary: orderSummary || '00:00 h',
    };
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setData({
        stationId: state.data.stationId || 'N/A',
        orderId: state?.data.assignedJobDetails?.orderId || 'N/A',
        machineStatus: state?.data.process?.currentPhaseDetails?.state || 'N/A',
        startTimeOfCompleteProcess: startTimeOfProcess,
        currentPhaseName: currentPhaseName || 'N/A',
        currentPhaseTime: currentPhaseTime || '00:00',
        orderSummary: orderSummary || '00:00 h',
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [
    state?.data.assignedJobDetails?.orderId,
    state?.data.process?.currentPhaseDetails?.state,
    startTimeOfProcess,
    currentPhaseName,
    currentPhaseTime,
    orderSummary,
  ]);
  const isPhasePreparing =
    state &&
    state.data.process &&
    state.data.process.currentPhaseDetails &&
    state.data.process.currentPhaseDetails.state === 'FINISHED';

  const station = useMemo(() => {
    return state === null ? 'N/A' : state.data.station.mainSpeed;
  }, [state]);

  const mountingPhase =
    state &&
    state.data.process.previousPhases.find(
      (phase) => phase.phaseName === 'mounting',
    );

  // Function to get the start time or "Not started" message
  const getStart = () => {
    // if (state && state.data.process.currentPhaseDetails.state === 'FINISHED') {
    //   return translation.text.notStarted;
    // } else
    if (mountingPhase) {
      return `${translation.text.startedAt} ${formatDate(
        previousPhase[0].startTime,
      )}`;
    } else if (
      state &&
      state.data.process.currentPhaseDetails.phaseName === 'mounting'
    )
      return `${translation.text.startedAt} ${formatDate(
        state.data.process.currentPhaseDetails.startTime,
      )}`;
    return translation.text.notStarted;
  };

  // Function to get the image source based on the current phase state
  const getImageSource = isPhaseProduction
    ? `${styles.startIcon}`
    : isStateDowntime
    ? `${styles.stopIcon}`
    : styles.stopIcon;

  return (
    <IonCard className={styles.orderInfoCard}>
      <IonCardHeader className={styles.property}>
        <IonCardTitle>
          <IonIcon icon={ellipse} size="small" className={getImageSource} />{' '}
          {translation.text.station}: {data.stationId}
          <IonCardSubtitle className={styles.speed}>
            {translation.text.machineSpeed}: {station} {translation.text.ppm}
          </IonCardSubtitle>
        </IonCardTitle>
        <div>
          {state.data.process.currentPhaseDetails.phaseName === 'mounting' && (
            <IonCardTitle className={styles.processTime}>
              {data.startTimeOfCompleteProcess}
            </IonCardTitle>
          )}
          {state.data.process.currentPhaseDetails.phaseName !== 'mounting' && (
            <IonCardTitle className={styles.processTime}>
              {data.orderSummary}
            </IonCardTitle>
          )}
          <IonCardSubtitle>{getStart()}</IonCardSubtitle>
        </div>
      </IonCardHeader>
      <IonCardContent>
        <div className={styles.right}>
          <IonCardTitle className={styles.phasedetails}>
            {state.data.process.currentPhaseDetails.phaseName !==
              'production' && (
              <>
                {translation.description[data.currentPhaseName]}{' '}
                {translation.text.time}:<div> {data.currentPhaseTime}</div>
              </>
            )}
            {state.data.process.currentPhaseDetails.phaseName ===
              'production' && (
              <>
                {translation.description[data.currentPhaseName]}{' '}
                {translation.text.time}: {data.currentPhaseTime}
                <ProductionVsDowntime />{' '}
              </>
            )}
          </IonCardTitle>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default OrderProcessSummary;
