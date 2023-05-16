import CardContainer from '../common/cardContainer/CardContainer';
import { IonCardContent, IonGrid, IonButton } from '@ionic/react';
import styles from './PhaseDetails.module.scss';

const PhaseDetails: React.FC = () => {
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
          </div>
        </IonGrid>
      </CardContainer>
    </>
  );
};

export default PhaseDetails;
