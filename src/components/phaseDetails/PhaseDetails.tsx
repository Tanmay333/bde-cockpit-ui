/* eslint-disable @typescript-eslint/no-explicit-any */
import CardContainer from '../common/cardContainer/CardContainer';
import { IonCardContent } from '@ionic/react';
import styles from './PhaseDetails.module.scss';
import { useAppSelector } from '../../store/utils/hooks';
import { Fragment, Key } from 'react';
import bulletPoint2 from '../../static/assets/images/BulletPoint2.svg';
import bulletpoint from '../../static/assets/images/Bulletpoint.svg';
import bulletpoint1 from '../../static/assets/images/BulletPoint1.svg';
import { formatTime } from '../../store/utils/formatTime';
import { useTranslations } from '../../store/slices/translation.slice';

// PhaseDetails component
const PhaseDetails: React.FC = () => {
  const translation = useTranslations();
  const state = useAppSelector((state) => state.machineDetailsSlice.data);

  // Helper function to format the start time
  const startTime = () => {
    if (
      state === null ||
      !state.process ||
      !state.process.currentPhaseDetails
    ) {
      return '--:--';
    }
    // Get the start time from the currentPhaseDetails and format it as HH:mm
    const startTime =
      state.process.currentPhaseDetails.startTime === null
        ? new Date()
        : new Date(state.process.currentPhaseDetails.startTime);
    const hours = startTime.getHours().toString().padStart(2, '0');
    const minutes = startTime.getMinutes().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;
    return formattedTime;
  };

  // Helper function to format the end time
  const endTime = () => {
    if (
      state === null ||
      !state.process ||
      !state.process.currentPhaseDetails
    ) {
      return '--:--';
    }
    // Get the end time from the currentPhaseDetails and format it as HH:mm
    const endTime =
      state.process.currentPhaseDetails.endTime === null
        ? new Date()
        : new Date(state.process.currentPhaseDetails.endTime);
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
      state.process.currentPhaseDetails.downtimes === null
    ) {
      return [];
    }

    const downtimes = state.process.currentPhaseDetails.downtimes;

    downtimes.forEach((item, index) => {
      // Format the pause and resume times
      const pauseTime = formatTime(item.startTime);
      const resumeTime = formatTime(item.endTime);

      // Push JSX elements representing the downtime reasons to the renderedList array
      renderedList.push(
        <Fragment key={index}>
          <div className={styles.reason}>
            <img src={bulletPoint2} alt="bullet" className={styles.bullet} />
            {translation.text.pauseAt} {pauseTime}: {item.reason}
          </div>
          {state.process.currentPhaseDetails.downtimes !== null && (
            <div className={styles.reason}>
              <img src={bulletpoint} alt={'bullet'} className={styles.bullet} />
              {translation.text.resumeAt}: {resumeTime}
            </div>
          )}
        </Fragment>,
      );
    });

    return <div>{renderedList}</div>;
  };

  // Helper function to format the downtime reasons as an array of objects
  const setUpDownTimes = () => {
    if (
      state === null ||
      state.process.currentPhaseDetails.downtimes === null
    ) {
      return [];
    }
    const downtimes = state.process.currentPhaseDetails.downtimes;

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
    const phaseName = state.process.currentPhaseDetails.phaseName;

    if (phaseName === 'mounting') {
      return [{ label: translation.text.startTime, value: startTime() }];
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
    if (phaseName === 'cleaning') {
      return [{ label: translation.text.startTime, value: startTime() }];
    }
    if (
      phaseName === 'unmounting' &&
      state?.process.currentPhaseDetails.state === 'RUNNING'
    ) {
      return [{ label: translation.text.startTime, value: startTime() }];
    }
    if (
      phaseName === 'unmounting' &&
      state?.process.currentPhaseDetails.state === 'FINISHED'
    ) {
      return [
        { label: translation.text.startTime, value: startTime() },
        { label: translation.text.endTime, value: endTime() },
      ];
    }
    return [];
  };

  return (
    <>
      <CardContainer title={translation.text.phaseDetails} position={'start'}>
        <IonCardContent>
          {state && state.process.currentPhaseDetails.phaseName === null ? (
            <>
              <div className={styles.reason} key={'stTime'}>
                <img
                  src={bulletpoint1}
                  alt={'bullet'}
                  className={styles.bullet}
                />
                {translation.text.startTime}: --:--
              </div>
              <div className={styles.reason} key={'endTime'}>
                <img
                  src={bulletpoint1}
                  alt={'bullet'}
                  className={styles.bullet}
                />
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
            state.process.currentPhaseDetails.phaseName === 'production' ? (
              <>
                <div className={styles.reason} key={'stTime'}>
                  <img
                    src={bulletpoint}
                    alt={'bullet'}
                    className={styles.bullet}
                  />
                  {translation.text.startTime}:
                  {formatTime(state.process.currentPhaseDetails.startTime)}
                </div>
                {downtimeReasonsList()}
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
                    <img
                      src={bulletpoint}
                      alt={'bullet'}
                      className={styles.bullet}
                    />
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
