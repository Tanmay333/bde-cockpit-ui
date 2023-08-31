/* eslint-disable @typescript-eslint/no-explicit-any */
import CardContainer from '../common/cardContainer/CardContainer';
import { IonCardContent, IonIcon } from '@ionic/react';
import styles from './PhaseDetails.module.scss';
import { useAppSelector } from '../../store/utils/hooks';
import { Fragment, Key } from 'react';
import { formatTime } from '../../store/utils/formatTime';
import { useTranslations } from '../../store/slices/translation.slice';
import { ellipse } from 'ionicons/icons';

// PhaseDetails component
const PhaseDetails: React.FC = () => {
  const translation = useTranslations();
  const state = useAppSelector((state) => state.machineDetailsSlice.data);

  // Helper function to format the start time
  const startTime = () => {
    if (
      state === null ||
      !state.data.process ||
      !state.data.process.currentPhaseDetails
    ) {
      return '--:--';
    }
    // Get the start time from the currentPhaseDetails and format it as HH:mm
    const startTime =
      state.data.process.currentPhaseDetails.startTime === null
        ? new Date()
        : new Date(state.data.process.currentPhaseDetails.startTime);
    const hours = startTime.getHours().toString().padStart(2, '0');
    const minutes = startTime.getMinutes().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;
    return formattedTime;
  };

  // Helper function to format the end time
  const endTime = () => {
    if (
      state === null ||
      !state.data.process ||
      !state.data.process.currentPhaseDetails
    ) {
      return '--:--';
    }
    // Get the end time from the currentPhaseDetails and format it as HH:mm
    const endTime =
      state.data.process.currentPhaseDetails.endTime === null
        ? new Date()
        : new Date(state.data.process.currentPhaseDetails.endTime);
    const hours = endTime.getHours().toString().padStart(2, '0');
    const minutes = endTime.getMinutes().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;
    return formattedTime;
  };

  // Helper function to render the list of downtime reasons
  const downtimeReasonsList = () => {
    const renderedList: JSX.Element[] = [];
    if (
      state === null ||
      state.data.process.currentPhaseDetails.downtimes === null
    ) {
      return [];
    }

    const downtimes = state.data.process.currentPhaseDetails.downtimes;

    downtimes.forEach((item, index) => {
      // Format the pause and resume times
      const pauseTime = formatTime(item.startTime);
      const resumeTime = formatTime(item.endTime);

      // Check if the reason is not null and is one of the specified reasons (p001, p002, p003, p004)
      const isPlannedDownTime =
        item.reason !== null &&
        ['p001', 'p002', 'p003', 'p004'].includes(item.reason);

      // Conditionally add the yellowBackground class to the tag
      const bulletClass = isPlannedDownTime
        ? `${styles.incidentdowntime} ${styles.planneddowntime}`
        : styles.incidentdowntime;

      const mapReasonToText = (reason: string | null) => {
        // Create a mapping of item.reason values to display text
        const reasonMap: { [key: string]: string } = {
          p001: translation.reason.changingBarrel,
          p002: translation.reason.changingLabels,
          p003: translation.reason.break,
          p004: translation.reason.rework,
          i001: translation.reason.mechanicalIncident,
          i002: translation.reason.electricalIncident,
          i003: translation.reason.misuse,
          i004: translation.reason.defectiveFillingMaterial,
          i005: translation.reason.otherIncident,
          i006: translation.reason.incidentLabelMachine,
          // Add more mappings as needed
        };
        // Check if the reason is in the mapping, and return the corresponding text,
        // or return the reason itself if there's no mapping.
        return reason ? reasonMap[reason] || reason : 'Unknown';
      };

      // Push JSX elements representing the downtime reasons to the renderedList array
      renderedList.unshift(
        <Fragment key={index}>
          {state.data.process.currentPhaseDetails.downtimes !== null && (
            <div className={styles.reason}>
              <IonIcon icon={ellipse} className={styles.phaseTime} />
              {translation.text.resumeAt}: {resumeTime}
            </div>
          )}
          <div className={styles.reason}>
            <IonIcon icon={ellipse} className={bulletClass} />
            {translation.text.pauseAt} {pauseTime}:{' '}
            {mapReasonToText(item.reason)}
          </div>
        </Fragment>,
      );
    });

    return <div>{renderedList}</div>;
  };

  // Helper function to format the downtime reasons as an array of objects
  const setUpDownTimes = () => {
    if (
      state === null ||
      state.data.process.currentPhaseDetails.downtimes === null
    ) {
      return [];
    }
    const downtimes = state.data.process.currentPhaseDetails.downtimes;

    // Format each downtime reason as an object with 'label' and 'value' properties
    const formattedDowntimes = downtimes.map((downtime) => {
      return {
        label: downtime.reason,
        value: `${formatTime(downtime.startTime)} - ${formatTime(
          downtime.endTime,
        )}`,
      };
    });
    return formattedDowntimes;
  };

  // Helper function to determine the phase description details
  const phaseDescription = () => {
    if (state === null) {
      return [];
    }
    const phaseName = state.data.process.currentPhaseDetails.phaseName;

    if (
      phaseName === 'mounting' &&
      state?.data.process.currentPhaseDetails.state === 'RUNNING'
    ) {
      return [{ label: translation.text.startTime, value: startTime() }];
    }
    if (
      phaseName === 'mounting' &&
      state?.data.process.currentPhaseDetails.state === 'FINISHED'
    ) {
      return [
        { label: translation.text.endTime, value: endTime() },
        { label: translation.text.startTime, value: startTime() },
      ];
    }
    if (phaseName === 'preparing') {
      return [{ label: translation.text.startTime, value: startTime() }];
    }
    if (phaseName === 'production') {
      const downtimeReasons = setUpDownTimes();
      const pauseResumeItems = downtimeReasons.map((item) => {
        if (item.label && item.label !== 'Start time') {
          return {
            label: `Pause at ${item.value}: ${item.label}`,
            value: '',
          };
        } else {
          return {
            label: `Resume at ${item.label}`,
            value: '',
          };
        }
      });
      return [
        { label: translation.text.startTime, value: startTime() },
        ...downtimeReasons,
        ...pauseResumeItems,
      ];
    }
    if (
      phaseName === 'cleaning' &&
      state?.data.process.currentPhaseDetails.state === 'RUNNING'
    ) {
      return [{ label: translation.text.startTime, value: startTime() }];
    }
    if (
      phaseName === 'cleaning' &&
      state?.data.process.currentPhaseDetails.state === 'FINISHED'
    ) {
      return [
        { label: translation.text.endTime, value: endTime() },
        { label: translation.text.startTime, value: startTime() },
      ];
    }
    if (
      phaseName === 'unmounting' &&
      state?.data.process.currentPhaseDetails.state === 'RUNNING'
    ) {
      return [{ label: translation.text.startTime, value: startTime() }];
    }
    if (
      phaseName === 'unmounting' &&
      state?.data.process.currentPhaseDetails.state === 'FINISHED'
    ) {
      return [
        { label: translation.text.endTime, value: endTime() },
        { label: translation.text.startTime, value: startTime() },
      ];
    }
    return [];
  };

  return (
    <>
      <CardContainer title={translation.text.phaseDetails} position={'start'}>
        <IonCardContent>
          {state &&
          state.data.process.currentPhaseDetails.phaseName === null ? (
            <>
              <div className={styles.reason} key={'stTime'}>
                <IonIcon icon={ellipse} className={styles.endTime} />
                {translation.text.startTime}: --:--
              </div>
              <div className={styles.reason} key={'endTime'}>
                <IonIcon icon={ellipse} className={styles.endTime} />
                <span className={styles.reason}>
                  {translation.text.endTime}: --:--
                </span>{' '}
              </div>
            </>
          ) : null}

          <div
            style={{
              height: '225px',
              overflow: 'scroll',
            }}
          >
            {/* Hide the scroll bar */}
            <style>
              {`
                ::-webkit-scrollbar {
                  display: none;
                }
              `}
            </style>
            {state &&
            state.data.process.currentPhaseDetails.phaseName ===
              'production' ? (
              <>
                {downtimeReasonsList()}
                <div className={styles.reason} key={'stTime'}>
                  <IonIcon icon={ellipse} className={styles.phaseTime} />
                  {translation.text.startTime}:
                  {formatTime(state.data.process.currentPhaseDetails.startTime)}
                </div>
              </>
            ) : (
              // Render phase details based on other phase names
              phaseDescription().map(
                (
                  item: {
                    label: any;
                    value: any;
                  },
                  index: Key | null | undefined,
                ) => (
                  <div key={index} className={styles.reason}>
                    <IonIcon icon={ellipse} className={styles.phaseTime} />
                    {`${item.label} : ${item.value}`}
                  </div>
                ),
              )
            )}
          </div>
        </IonCardContent>
      </CardContainer>
    </>
  );
};

export default PhaseDetails;
