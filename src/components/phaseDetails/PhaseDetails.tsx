import CardContainer from '../common/cardContainer/CardContainer';
import { IonCardContent, IonGrid, IonButton, IonList } from '@ionic/react';

const PhaseDetails: React.FC = () => {
  return (
    <CardContainer title="Phase details">
      <IonCardContent
        style={{
          fontSize: '16px',
          fontWeight: '400',
        }}
      >
        <IonList style={{ marginBottom: '10px' }}>Start time: -- --</IonList>
        <IonList style={{ marginBottom: '10px' }}>End time: -- --</IonList>
      </IonCardContent>

      <IonGrid
        style={{
          textAlign: 'center',
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
    </CardContainer>
  );
};

export default PhaseDetails;
