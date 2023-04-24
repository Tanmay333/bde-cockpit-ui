import XXCard from '../common/XCard/XXCard';
import { IonCardContent, IonGrid, IonButton, IonList } from '@ionic/react';
import styles from '../common/XCard/XCard.module.scss';

const WorkDetails: React.FC = () => {
  return (
    <XXCard className={styles.start} title="Order details">
      <IonCardContent
        style={{
          fontSize: '16px',
          fontWeight: '400',
          //margin: '30px',
        }}
      >
        <IonList style={{ marginBottom: '10px' }}>Order number: -- --</IonList>
        <IonList>Order quantity: -- --</IonList>
      </IonCardContent>

      <IonGrid
        style={{
          textAlign: 'center',
          //bottom: "10%",
        }}
      >
        <IonButton
          href="/OrderDetails"
          type="submit"
          //onClick={() => btnLink}
          fill="solid"
          style={{
            width: '210px',
            height: '50px',
          }}
        >
          Scan bar-code
        </IonButton>
      </IonGrid>
    </XXCard>
  );
};

export default WorkDetails;
