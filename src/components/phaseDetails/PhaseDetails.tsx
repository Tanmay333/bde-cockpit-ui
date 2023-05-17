import CardContainer from '../common/cardContainer/CardContainer';
import { IonCardContent, IonGrid, IonButton } from '@ionic/react';
import styles from './PhaseDetails.module.scss';
import { useCallback } from 'react';
import { useAppDispatch } from '../../store/utils/hooks';
import { getMachineDetails } from '../../store/slices/machineDetailsSlice';
import { useHistory } from 'react-router';

const PhaseDetails: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const onEndUnmounting = useCallback(() => {
    dispatch(
      getMachineDetails({
        action: 'setEndOfUnmounting',
        jobId: '782e0622-c9d8-4f5d-a026-d51ef99f2c08',
      }),
    );
  }, [history]);

  const onEndCleaning = useCallback(() => {
    dispatch(
      getMachineDetails({
        action: 'setEndOfCleaning',
        jobId: '782e0622-c9d8-4f5d-a026-d51ef99f2c08',
      }),
    );
  }, [history]);

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
              href="/"
              type="submit"
              fill="solid"
              style={{
                width: '210px',
                height: '50px',
              }}
              color={'danger'}
            >
              Mounting
            </IonButton>
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
          </div>
        </IonGrid>
      </CardContainer>
    </>
  );
};

export default PhaseDetails;
