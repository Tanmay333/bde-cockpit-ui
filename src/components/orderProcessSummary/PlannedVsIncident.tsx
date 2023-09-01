import React from 'react';
import { useAppSelector } from '../../store/utils/hooks';
import { isDefined } from '../../utils/isDefined';
import useTimeout from '../../hooks/useTimeout';
import { IonIcon } from '@ionic/react';
import styles from './OrderProcessSummary.module.scss';
import { ellipse } from 'ionicons/icons';
import { useTranslations } from '../../store/slices/translation.slice';

const PlannedVsIncident: React.FC = () => {
  const translation = useTranslations();
  // Retrieve the machine details from the Redux store
  const { process } = useAppSelector(
    (state) => state.machineDetailsSlice.data.data,
  );
  useTimeout();

  // Extract the start time of production and downtime details from the current phase
  const currentTime = new Date().getTime();
  const startTimeOfProduction = process.currentPhaseDetails.startTime;
  const downTimes = process.currentPhaseDetails.downtimes;

  const calculateDowntime = () => {
    if (!isDefined(startTimeOfProduction) || !isDefined(downTimes)) {
      return {
        plannedDowntime: {
          duration: '00:00',
          count: 0,
        },
        incidentDowntime: {
          duration: '00:00',
          count: 0,
        },
      };
    }

    const plannedDowntime = {
      durationInSeconds: 0,
      count: 0,
    };
    const incidentDowntime = {
      durationInSeconds: 0,
      count: 0,
    };

    for (let i = 0; i < downTimes.length; i++) {
      const downtime = downTimes[i];
      const st =
        downtime.startTime === null
          ? 0
          : new Date(downtime.startTime).getTime();
      const et =
        downtime.endTime === null
          ? currentTime
          : new Date(downtime.endTime).getTime();
      const durationInSeconds = (et - st) / 1000;

      Math.floor(durationInSeconds / 3600);
      Math.floor((durationInSeconds % 3600) / 60);

      if (
        downtime.reason === 'p001' ||
        downtime.reason === 'p002' ||
        downtime.reason === 'p003' ||
        downtime.reason === 'p004'
      ) {
        plannedDowntime.durationInSeconds += durationInSeconds;
        plannedDowntime.count += 1;
      } else {
        incidentDowntime.durationInSeconds += durationInSeconds;
        incidentDowntime.count += 1;
      }
    }

    const formatTime = (timeInSeconds: number) => {
      const hours = Math.floor(timeInSeconds / 3600);
      const minutes = Math.floor((timeInSeconds % 3600) / 60);

      const hrsFormat = hours < 10 ? `0${hours}` : hours;
      const minFormat = minutes < 10 ? `0${minutes}` : minutes;

      return `${hrsFormat}:${minFormat}`;
    };

    return {
      plannedDowntime: {
        duration: formatTime(plannedDowntime.durationInSeconds),
        count: plannedDowntime.count,
      },
      incidentDowntime: {
        duration: formatTime(incidentDowntime.durationInSeconds),
        count: incidentDowntime.count,
      },
    };
  };

  // Call the calculateDowntime function to get counts of planned and incident downtime
  const { plannedDowntime, incidentDowntime } = calculateDowntime();

  return (
    <>
      <IonIcon icon={ellipse} className={styles.planned} />
      {plannedDowntime.duration} h {translation.text.planned} (
      {plannedDowntime.count}){'    '}{' '}
      <IonIcon icon={ellipse} className={styles.incident} />
      {incidentDowntime.duration} h {translation.text.incident} (
      {incidentDowntime.count})
    </>
  );
};

export default PlannedVsIncident;
