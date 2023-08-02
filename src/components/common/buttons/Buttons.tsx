import { IonButton, IonGrid } from '@ionic/react';
import useWebSocket from '../../../store/hooks/useWebSocket';
import { useAppDispatch, useAppSelector } from '../../../store/utils/hooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import style from './buttos.module.scss';
import { useHistory } from 'react-router';
import { getData } from '../../../store/slices/startNewOrderSlice';
import { StartNewOrder } from '../../../store/slices/machineDetailsSlice';
import { useTranslations } from '../../../store/slices/translation.slice';

const Buttons = () => {
  const translation = useTranslations();
  const history = useHistory();
  const [startNewOrder, setStartNewOrder] = useState(false);
  const dispatch = useAppDispatch();
  const { sendMessage } = useWebSocket();
  const state = useAppSelector((state) => state.machineDetailsSlice.data);

  const onClick = useCallback(() => {
    const updatedValue = !startNewOrder;
    setStartNewOrder(updatedValue);
    dispatch(StartNewOrder());
  }, [startNewOrder, history]);

  const StartPreparation = useCallback(() => {
    history.push('/selectteamsize');
  }, [history]);

  useEffect(() => {
    dispatch(getData(startNewOrder));
  }, [startNewOrder, dispatch]);

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
            {translation.buttons.startPreparation}
          </IonButton>
        )}
        {isPhaseUnmounting && !isStateFinished && (
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
            {translation.buttons.endUnmounting}
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
            {translation.buttons.endCleaning}
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
            {translation.buttons.startNewOrder}
          </IonButton>
        )}
      </div>
    </IonGrid>
  );
};

export default Buttons;
