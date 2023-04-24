import XXCard from '../common/XCard/XXCard';
import { IonCardContent, IonGrid, IonButton, IonList } from '@ionic/react';
import styles from '../common/XCard/XCard.module.scss';

const PhaseDetails: React.FC = () => {
  return (
    <XXCard className={styles.start} title="Phase details">
      <IonCardContent
        style={{
          fontSize: '16px',
          fontWeight: '400',
          //margin: '30px',
        }}
      >
        <IonList style={{ marginBottom: '10px' }}>Start time: -- --</IonList>
        <IonList style={{ marginBottom: '10px' }}>End time: -- --</IonList>
      </IonCardContent>

      <IonGrid
        style={{
          textAlign: 'center',

          //bottom: "10%",
        }}
      >
        <IonButton
          href="/"
          type="submit"
          //onClick={() => btnLink}
          fill="solid"
          style={{
            width: '210px',
            height: '50px',
          }}
          color={'danger'}
        >
          Mounting
        </IonButton>
      </IonGrid>
    </XXCard>
  );
};

export default PhaseDetails;
