import CardContainer from '../common/cardContainer/CardContainer';
import { IonCardContent, IonGrid, IonButton } from '@ionic/react';
import styles from './PhaseDetails.module.scss';
import { useAppSelector } from '../../store/utils/hooks';
import useWebSocket from '../../store/hooks/useWebSocket';
import { useMemo } from 'react';

const PhaseDetails: React.FC = () => {
  const { sendMessage } = useWebSocket();
  const state = useAppSelector((state) => state.machineDetailsSlice.data);

  const startData = () => {
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

  const endData = () => {
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

  const jobId = useMemo(() => {
    if (
      state === null ||
      !state.assignedJobDetails ||
      state.assignedJobDetails.jobId === null
    ) {
      return null;
    } else {
      return state.assignedJobDetails.jobId;
    }
  }, [state]);

  const onEndUnmounting = () => {
    if (jobId === null) {
      return;
    }
    const message = {
      action: 'setEndOfUnmounting',
      jobId: jobId,
    };
    sendMessage(message);
  };

  const onEndCleaning = () => {
    if (jobId === null) {
      return;
    }
    const message = {
      action: 'setEndOfCleaning',
      jobId: jobId,
    };
    sendMessage(message);
  };

  const isPhaseUnmounting =
    state?.process?.currentPhaseDetails?.phaseName === 'unmounting';

  const isPhasecleaning =
    state?.process?.currentPhaseDetails?.phaseName === 'cleaning';

  return (
    <>
      <CardContainer title="Phase details" position={'start'}>
        <IonCardContent>
          <div className={styles.bowl}>
            <p>Start time: {startData()}</p>
            <p>End time: {endData()}</p>
          </div>
        </IonCardContent>

        <IonGrid
          style={{
            textAlign: 'center',
          }}
        >
          <div className={styles.BtnHolder}>
            {isPhaseUnmounting && (
              <IonButton
                onClick={onEndUnmounting}
                type="submit"
                fill="solid"
                style={{
                  width: '210px',
                  height: '50px',
                }}
                color={'danger'}
              >
                End UnMounting
              </IonButton>
            )}
            {isPhasecleaning && (
              <IonButton
                onClick={onEndCleaning}
                type="submit"
                fill="solid"
                style={{
                  width: '210px',
                  height: '50px',
                }}
                color={'danger'}
              >
                End Cleaning
              </IonButton>
            )}
          </div>
        </IonGrid>
      </CardContainer>
    </>
  );
};

export default PhaseDetails;
