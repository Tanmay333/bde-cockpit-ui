import { useCallback, useState } from 'react';
import CardContainer from '../common/cardContainer/CardContainer';
import { IonCardContent, IonGrid, IonButton, IonList } from '@ionic/react';

const OrderDetails: React.FC = () => {
  const [barcodeState, setBarcodeState] = useState(false);

  const onClick = useCallback(() => {
    setBarcodeState(true);
  }, [barcodeState]);

  if (barcodeState === true) {
    alert('data');
  }

  return (
    <CardContainer title="Order details">
      <IonCardContent
        style={{
          fontSize: '16px',
          fontWeight: '400',
        }}
      >
        <IonList style={{ marginBottom: '10px' }}>Order number: -- --</IonList>
        <IonList>Order quantity: -- --</IonList>
      </IonCardContent>

      <IonGrid
        style={{
          textAlign: 'center',
        }}
      >
        <IonButton
          type="submit"
          onClick={onClick}
          fill="solid"
          style={{
            width: '210px',
            height: '50px',
          }}
        >
          Scan bar-code
        </IonButton>
      </IonGrid>
    </CardContainer>
  );
};

export default OrderDetails;
