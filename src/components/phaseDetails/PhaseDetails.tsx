import CardContainer from '../common/cardContainer/CardContainer';
import { IonCardContent, IonGrid, IonButton } from '@ionic/react';
import styles from './PhaseDetails.module.scss';
import { useAppSelector } from '../../store/utils/hooks';
import useWebSocket from '../../store/hooks/useWebSocket';

const PhaseDetails: React.FC = () => {
  const { sendMessage } = useWebSocket();
  const state = useAppSelector((state) => state.machineDetailsSlice.data);

  const jobId = state === null ? null : state.assignedJobDetails.jobId;

  const onEndUnmounting = () => {
    const message = {
      action: 'setEndOfUnmounting',
      jobId: jobId,
    };
    sendMessage(message);
  };

  const onEndCleaning = () => {
    const message = {
      action: 'setEndOfCleaning',
      jobId: jobId,
    };
    sendMessage(message);
  };

  return (
    <>
      <CardContainer title="Phase details" position={'start'}>
        <IonCardContent>
          <div className={styles.bowl}>
            <p>Start time: --:--</p>
            <p>End time: --:--</p>
          </div>
        </IonCardContent>

        <IonGrid
          style={{
            textAlign: 'center',
          }}
        >
          <div className={styles.BtnHolder}>
            <IonButton
              //href="/"
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
          </div>
        </IonGrid>
      </CardContainer>
    </>
  );
};

export default PhaseDetails;
