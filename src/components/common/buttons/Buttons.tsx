import { IonButton, IonGrid } from '@ionic/react';
import useWebSocket from '../../../store/hooks/useWebSocket';
import { useAppDispatch, useAppSelector } from '../../../store/utils/hooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import style from './Buttos.module.scss';
import { useHistory } from 'react-router';
import { getData } from '../../../store/slices/startNewOrderSlice';
import { StartNewOrder } from '../../../store/slices/machineDetailsSlice';
import { useTranslations } from '../../../store/slices/translation.slice';
import PropTypes from 'prop-types';
import LoadingIndicator from '../loadingIndicator/LoadingIndicator';

interface ButtonsProps {
  setIsLoadingIndicator: React.Dispatch<React.SetStateAction<boolean>>;
}

const Buttons: React.FC<ButtonsProps> = ({ setIsLoadingIndicator }) => {
  const translation = useTranslations();
  const history = useHistory();
  const [startNewOrder, setStartNewOrder] = useState(false);
  const [isLoadingEndMounting, setIsLoadingEndMounting] = useState(false);
  const [isLoadingEndCleaning, setIsLoadingEndCleaning] = useState(false);
  const [isLoadingStartUnmounting, setIsLoadingStartUnmounting] =
    useState(false);
  const [isLoadingEndUnmounting, setIsLoadingEndUnmounting] = useState(false);
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
      !state.data.assignedJobDetails ||
      state.data.assignedJobDetails.jobId === null
    ) {
      return null;
    } else {
      return state.data.assignedJobDetails.jobId;
    }
  }, [state]);

  // Function to send the 'setEndOfMounting' message to the WebSocket
  const onEndMounting = () => {
    if (jobId === null) {
      return;
    }
    const message = {
      action: 'setEndOfMounting',
      jobId: jobId,
    };
    sendMessage(message);
    setIsLoadingEndMounting(true);
    setIsLoadingIndicator(true);
  };

  // Function to send the 'setStartOfUnmounting' message to the WebSocket
  const onStartUnmounting = () => {
    if (jobId === null) {
      return;
    }
    const message = {
      action: 'setStartOfUnmounting',
      jobId: jobId,
    };
    sendMessage(message);
    setIsLoadingStartUnmounting(true);
    setIsLoadingIndicator(true);
  };

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
    setIsLoadingEndUnmounting(true);
    setIsLoadingIndicator(true);
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
    setIsLoadingEndCleaning(true);
    setIsLoadingIndicator(true);
  };

  // Check various conditions to determine which buttons to display
  const isPhaseNull =
    state?.data.process &&
    state.data.process.currentPhaseDetails &&
    state?.data.process.currentPhaseDetails.phaseName === null;

  const isStateFinished =
    state?.data.process &&
    state.data.process.currentPhaseDetails &&
    state?.data.process.currentPhaseDetails.state === 'FINISHED';

  const isStateRunning =
    state?.data.process &&
    state.data.process.currentPhaseDetails &&
    state?.data.process.currentPhaseDetails.state === 'RUNNING';

  const isPhaseMounting =
    state?.data.process &&
    state.data.process.currentPhaseDetails &&
    state?.data.process.currentPhaseDetails.phaseName === 'mounting';

  const isPhaseUnmounting =
    state?.data.process &&
    state.data.process.currentPhaseDetails &&
    state?.data.process?.currentPhaseDetails?.phaseName === 'unmounting';

  const isPhasecleaning =
    state?.data.process &&
    state.data.process.currentPhaseDetails &&
    state?.data.process?.currentPhaseDetails?.phaseName === 'cleaning';

  useEffect(() => {
    if (isPhasecleaning && isStateFinished) {
      setIsLoadingEndCleaning(false);
      setIsLoadingIndicator(false);
    }
    if (isPhaseUnmounting && isStateFinished) {
      setIsLoadingEndUnmounting(false);
      setIsLoadingIndicator(false);
    }
    if (isPhaseUnmounting && isStateRunning) {
      setIsLoadingStartUnmounting(false);
      setIsLoadingIndicator(false);
    }
    if (isPhaseMounting && isStateFinished) {
      setIsLoadingEndMounting(false);
      setIsLoadingIndicator(false);
    }
  });
  return (
    <IonGrid>
      {/* Loading spinner */}
      {isLoadingEndMounting && <LoadingIndicator />}
      {isLoadingEndCleaning && <LoadingIndicator />}
      {isLoadingStartUnmounting && <LoadingIndicator />}
      {isLoadingEndUnmounting && <LoadingIndicator />}
      <div className={style.endBtn}>
        {isPhaseMounting && isStateRunning && (
          <IonButton
            className={style.end}
            fill="solid"
            type="submit"
            color={!isPhaseNull ? 'success' : 'light'}
            disabled={isPhaseNull}
            onClick={onEndMounting}
          >
            {translation.buttons.endMounting}
          </IonButton>
        )}
        {isPhaseMounting && isStateFinished && (
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
        {isPhasecleaning && isStateFinished && (
          <IonButton
            onClick={onStartUnmounting}
            type="submit"
            fill="solid"
            style={{
              width: '210px',
              height: '50px',
            }}
            color={'danger'}
          >
            {translation.buttons.startUnmounting}
          </IonButton>
        )}
        {isPhaseUnmounting && isStateRunning && (
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
        {isPhasecleaning && isStateRunning && (
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
        {isPhaseUnmounting && isStateFinished && (
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

Buttons.propTypes = {
  setIsLoadingIndicator: PropTypes.func.isRequired, // Validate that setIsLoadingIndicator is a function and required
};

export default Buttons;
