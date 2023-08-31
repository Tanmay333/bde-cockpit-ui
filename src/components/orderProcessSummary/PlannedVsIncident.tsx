import { ellipse } from 'ionicons/icons';
import styles from './OrderProcessSummary.module.scss';
import { useAppSelector } from '../../store/utils/hooks';
import { isDefined } from '../../utils/isDefined';
import { IonIcon } from '@ionic/react';
import { useTranslations } from '../../store/slices/translation.slice';

const PlannedVsIncident: React.FC = () => {
  const translation = useTranslations();
  // Retrieve the machine details from the Redux store
  const state = useAppSelector((state) => state.machineDetailsSlice.data);

  // Extract process details from the machine details
  const { process } = useAppSelector(
    (state) => state.machineDetailsSlice.data.data,
  );

  // Extract the start time of production and downtime details from the current phase
  const startTimeOfProduction = process.currentPhaseDetails.startTime;
  const downTimes = process.currentPhaseDetails.downtimes;

  // Calculate the time since downtime started and the current time
  const downTimeSinceTime =
    state.data.process.currentPhaseDetails.downtimeSince;
  const currentTime = new Date().getTime();
  const currentDownTime = downTimeSinceTime
    ? (currentTime - new Date(downTimeSinceTime).getTime()) / 1000
    : 0;

  // Extract planned and incident downtime durations from process details
  const plannedDownTime =
    state.data.process.currentPhaseDetails.totalPlannedDowntime;
  const incidentDownTime =
    state.data.process.currentPhaseDetails.totalIncidentDowntime;

  // Define a function to format time in hours and minutes
  const formattotalTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`;
  };

  // Convert downtime values to numbers, defaulting to 0 if not defined
  const totalPlannedDowntime = plannedDownTime ? Number(plannedDownTime) : 0;
  const totalIncidentDowntime = incidentDownTime ? Number(incidentDownTime) : 0;

  // Calculate the sum of current downtime and planned/incident downtime
  const sumofPlannedDownTime = currentDownTime + totalPlannedDowntime;
  const sumofIncidentDownTime = currentDownTime + totalIncidentDowntime;

  // Format the total planned and incident downtime durations
  const totalPlanned = formattotalTime(sumofPlannedDownTime);
  const totalIncident = formattotalTime(sumofIncidentDownTime);

  // Define a function to calculate the counts of planned and incident downtime events
  const calculateDowntime = () => {
    if (!isDefined(startTimeOfProduction) || !isDefined(downTimes)) {
      // Return default counts if start time or downtime data is not defined
      return {
        plannedDowntime: {
          count: 0,
        },
        incidentDowntime: {
          count: 0,
        },
      };
    }

    // Initialize counts for planned and incident downtime
    const plannedDowntime = {
      count: 0,
    };
    const incidentDowntime = {
      count: 0,
    };

    // Loop through downtime events and categorize them as planned or incident
    for (let i = 0; i < downTimes.length; i++) {
      const downtime = downTimes[i];
      if (
        downtime.reason === 'p001' ||
        downtime.reason === 'p002' ||
        downtime.reason === 'p003' ||
        downtime.reason === 'p004'
      ) {
        // Increment planned downtime count
        plannedDowntime.count += 1;
      } else {
        // Increment incident downtime count
        incidentDowntime.count += 1;
      }
    }

    // Return the counts of planned and incident downtime
    return {
      plannedDowntime: {
        count: plannedDowntime.count,
      },
      incidentDowntime: {
        count: incidentDowntime.count,
      },
    };
  };

  // Call the calculateDowntime function to get counts of planned and incident downtime
  const { plannedDowntime, incidentDowntime } = calculateDowntime();

  return (
    <>
      <IonIcon icon={ellipse} className={styles.planned} />
      {/* Display the total planned downtime and its count */}
      {totalPlanned} h {translation.text.planned} ({plannedDowntime.count}){' '}
      <IonIcon icon={ellipse} className={styles.incident} />
      {/* Display the total incident downtime and its count */}
      {totalIncident} h {translation.text.incident} ({incidentDowntime.count})
    </>
  );
};

export default PlannedVsIncident;
