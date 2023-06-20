import { IonButton, IonGrid } from '@ionic/react';
import useWebSocket from '../../../store/hooks/useWebSocket';
import { useAppDispatch, useAppSelector } from '../../../store/utils/hooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import style from './buttos.module.scss';
import { useHistory } from 'react-router';
import { getData } from '../../../store/slices/startNewOrderSlice';
import { StartNewOrder } from '../../../store/slices/machineDetailsSlice';

const Buttons = () => {
  const history = useHistory();
  const [startNewOrder, setStartNewOrder] = useState(false);

  useEffect(() => {
    const storedValue = localStorage.getItem('startNewOrder');
    const parsedValue = storedValue ? JSON.parse(storedValue) : false;
    setStartNewOrder(parsedValue);
  }, []);

  useEffect(() => {
    localStorage.setItem('startNewOrder', JSON.stringify(startNewOrder));
  }, [startNewOrder]);

  const onClick = useCallback(() => {
    const updatedValue = !startNewOrder;
    setStartNewOrder(updatedValue);
    dispatch(StartNewOrder());
  }, [startNewOrder, history]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getData(startNewOrder));
  }, [startNewOrder, dispatch]);

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

  const isStateFinished =
    state?.process &&
    state.process.currentPhaseDetails &&
    state?.process.currentPhaseDetails.state === 'FINISHED';

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
        {isPhasecleaning && !isStateFinished && (
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
        {isStateFinished && (
          <IonButton
            id="phase-one"
            className={style.end}
            fill="solid"
            type="submit"
            color={'success'}
            onClick={onClick}
          >
            Start new order
          </IonButton>
        )}
      </div>
    </IonGrid>
  );
};

export default Buttons;
