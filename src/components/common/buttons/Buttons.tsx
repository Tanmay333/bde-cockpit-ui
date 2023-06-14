import { IonButton, IonGrid } from '@ionic/react';
import useWebSocket from '../../../store/hooks/useWebSocket';
import { useAppSelector } from '../../../store/utils/hooks';
import { useCallback, useMemo } from 'react';
import style from './buttos.module.scss';
import { useHistory } from 'react-router';

const Buttons = () => {
  const { sendMessage } = useWebSocket();
  const state = useAppSelector((state) => state.machineDetailsSlice.data);

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

  const isPhaseNull =
    state?.process &&
    state.process.currentPhaseDetails &&
    state?.process.currentPhaseDetails.phaseName === null;

  const isPhaseMounting =
    state?.process &&
    state.process.currentPhaseDetails &&
    state?.process.currentPhaseDetails.phaseName === 'mounting';

  const isPhaseUnmounting =
    state?.process &&
    state.process.currentPhaseDetails &&
    state?.process?.currentPhaseDetails?.phaseName === 'unmounting';

  const isPhasecleaning =
    state?.process &&
    state.process.currentPhaseDetails &&
    state?.process?.currentPhaseDetails?.phaseName === 'cleaning';
  const history = useHistory();

  const StartPreparation = useCallback(() => {
    history.push('/selectteamsize');
  }, [history]);

  return (
    <IonGrid>
      <div className={style.endBtn}>
        {(isPhaseNull || isPhaseMounting) && (
          <IonButton
            className={style.end}
            fill="solid"
            type="submit"
            color={!isPhaseNull ? 'success' : 'light'}
            disabled={isPhaseNull}
            onClick={StartPreparation}
          >
            Start preparation
          </IonButton>
        )}
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
  );
};

export default Buttons;
