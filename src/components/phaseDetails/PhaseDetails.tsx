/* eslint-disable @typescript-eslint/no-explicit-any */
import CardContainer from '../common/cardContainer/CardContainer';
import { IonCardContent, IonGrid, IonButton } from '@ionic/react';
import styles from './PhaseDetails.module.scss';
import { useAppSelector } from '../../store/utils/hooks';
import { Fragment } from 'react';
import bulletPoint2 from '../../static/assets/images/BulletPoint2.svg';
import bulletpoint from '../../static/assets/images/bulletpoint.svg';
import { formatTime } from '../../store/utils/formatTime';

const PhaseDetails: React.FC = () => {
  const state = useAppSelector((state) => state.machineDetailsSlice.data);

  const startTime = () => {
    if (
      state === null ||
      !state.process ||
      !state.process.currentPhaseDetails
    ) {
      return '--:--';
    }
    const startTime =
      state.process.currentPhaseDetails.startTime === null
        ? new Date()
        : new Date(state.process.currentPhaseDetails.startTime);
    const hours = startTime.getHours().toString().padStart(2, '0');
    const minutes = startTime.getMinutes().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;
    return formattedTime;
  };

  const endTime = () => {
    if (
      state === null ||
      !state.process ||
      !state.process.currentPhaseDetails
    ) {
      return '--:--';
    }
    const endTime =
      state.process.currentPhaseDetails.endTime === null
        ? new Date()
        : new Date(state.process.currentPhaseDetails.endTime);
    const hours = endTime.getHours().toString().padStart(2, '0');
    const minutes = endTime.getMinutes().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;
    return formattedTime;
  };

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
      const pauseTime = formatTime(item.startTime);
      const resumeTime = formatTime(item.endTime);

      renderedList.push(
        <Fragment key={index}>
          <div className={styles.reason}>
            <img src={bulletPoint2} alt="bullet" className={styles.bullet} />
            <p>
              Pause at: {pauseTime} : {item.reason}
            </p>
          </div>
          <div className={styles.reason}>
            <img src={bulletpoint} alt={'bullet'} className={styles.bullet} />
            <p>Resume at: {resumeTime}</p>
          </div>
        </Fragment>,
      );
    });

    return <div>{renderedList}</div>;
  };

  const setUpDownTimes = () => {
    if (
      state === null ||
      state.process.currentPhaseDetails.downtimes === null
    ) {
      return [];
    }

    const downtimes = state.process.currentPhaseDetails.downtimes;

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

  const phaseDescription = () => {
    if (state === null) {
      return [];
    }
    const phaseName = state.process.currentPhaseDetails.phaseName;

    if (phaseName === 'mounting') {
      return [
        { label: 'Start time', value: startTime() },
        { label: 'End time', value: endTime() },
      ];
    }

    if (phaseName === 'preparing') {
      return [
        { label: 'Start time', value: startTime() },
        { label: 'End time', value: endTime() },
      ];
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
        { label: 'Start time', value: startTime() },
        ...downtimeReasons,
        ...pauseResumeItems,
        { label: 'End time', value: endTime() },
      ];
    }

    if (phaseName === 'unmounting') {
      return [
        { label: 'Start time', value: startTime() },
        { label: 'End time', value: endTime() },
      ];
    }

    if (phaseName === 'cleaning') {
      return [
        { label: 'Start time', value: startTime() },
        { label: 'End time', value: endTime() },
      ];
    }
    return [];
  };

  return (
    <>
      <CardContainer
        title="Phase details"
        position={'start'}
        style={{ overflow: 'auto' }}
      >
        <IonCardContent>
          {state &&
          state.process.currentPhaseDetails.phaseName === 'production' ? (
            <>
              <div className={styles.reason} key={'stTime'}>
                <img
                  src={bulletpoint}
                  alt={'bullet'}
                  className={styles.bullet}
                />
                <p>
                  Start time:
                  {formatTime(state.process.currentPhaseDetails.startTime)}
                </p>
              </div>
              {downtimeReasonsList()}
              <div className={styles.reason} key={'endTime'}>
                <img
                  src={bulletpoint}
                  alt={'bullet'}
                  className={styles.bullet}
                />
                <p className={styles.reason}>
                  End time:
                  {formatTime(
                    state && state.process.currentPhaseDetails.endTime,
                  )}
                </p>
              </div>
            </>
          ) : (
            phaseDescription().map(
              (
                item: {
                  label: any;
                  value: any;
                },
                index,
              ) => (
                <div key={index} className={styles.reason}>
                  <img
                    src={bulletpoint}
                    alt={'bullet'}
                    className={styles.bullet}
                  />
                  <p></p>
                  <p>{`${item.label}: ${item.value}`}</p>
                </div>
              ),
            )
          )}
        </IonCardContent>
      </CardContainer>
    </>
  );
};

export default PhaseDetails;
