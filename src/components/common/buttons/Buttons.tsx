import { IonButton, IonGrid } from '@ionic/react';
import useWebSocket from '../../../store/hooks/useWebSocket';
import { useAppDispatch, useAppSelector } from '../../../store/utils/hooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import style from './Buttos.module.scss';
import { useHistory } from 'react-router';
import { getData } from '../../../store/slices/startNewOrderSlice';
import { StartNewOrder } from '../../../store/slices/machineDetailsSlice';
import { useTranslations } from '../../../store/slices/translation.slice';

// Defining the Buttons component
const Buttons = () => {
  const translation = useTranslations();
  const history = useHistory();
  const [startNewOrder, setStartNewOrder] = useState(false);
  const dispatch = useAppDispatch();
  const { sendMessage } = useWebSocket();
  const state = useAppSelector((state) => state.machineDetailsSlice.data);

  // Function to handle the click event on the start preparation button
  const onClick = useCallback(() => {
    const updatedValue = !startNewOrder;
    setStartNewOrder(updatedValue);
    dispatch(StartNewOrder());
  }, [startNewOrder, history]);

  // Function to navigate to the select team size page
  const StartPreparation = useCallback(() => {
    history.push('/selectteamsize');
  }, [history]);

  // Effect hook to fetch data when the startNewOrder state changes
  useEffect(() => {
    dispatch(getData(startNewOrder));
  }, [startNewOrder, dispatch]);

  // Memoized job ID
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

  // Function to send the 'setEndOfUnmounting' message to the WebSocket
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

  // Function to send the 'setEndOfCleaning' message to the WebSocket
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

  // Check various conditions to determine which buttons to display
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
