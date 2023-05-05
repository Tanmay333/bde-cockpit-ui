import { useCallback, useRef, useState } from 'react';
import CardContainer from '../common/cardContainer/CardContainer';
import {
  IonCardContent,
  IonGrid,
  IonButton,
  IonList,
  IonModal,
  IonRow,
  IonCol,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from '../../store/utils/hooks';
import SelectWorkersIcon from '../../static/assets/images/SelectWorkersIcon';

const OrderDetails: React.FC = () => {
  const [barcodeState, setBarcodeState] = useState(false);

  const State = useAppSelector((State) => State.SelectworkersSlice);

  const modal = useRef<HTMLIonModalElement>(null);
  const history = useHistory();

  const onClick = useCallback(() => {
    setBarcodeState(true);
  }, [barcodeState]);

  const onBarcodeScanComplete = useCallback(() => {
    history.push('/confirmorderdetails');
    setBarcodeState(false);
  }, [history]);

  const renderSelectedIcons = () => {
    const icons = [];
    if (State.data == null) {
      return null;
    }
    for (let i = 0; i - 1 < State.data; i++) {
      icons.push(<SelectWorkersIcon isSelected />);
    }
    return icons;
  };

  return (
    <CardContainer title="Order details" position={'start'}>
      <IonCardContent
        style={{
          fontSize: '16px',
          fontWeight: '400',
        }}
      >
        <IonList style={{ marginBottom: '10px' }}>Order number: -- --</IonList>
        <IonList style={{ marginBottom: '10px' }}>
          Order quantity: -- --
        </IonList>
        <IonRow>
          <IonList>Members:</IonList>
          <IonCol style={{ width: '50px', height: '50px' }}>
            {renderSelectedIcons()}
          </IonCol>
        </IonRow>
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
        <IonModal
          style={{
            '--border-radius': '0px',
            '--width': '100%',
            '--height': '100%',
          }}
          ref={modal}
          isOpen={barcodeState}
        >
          <IonButton
            onClick={onBarcodeScanComplete}
            fill="solid"
            style={{
              width: '210px',
              height: '50px',
            }}
          >
            Sample scanner
          </IonButton>
        </IonModal>
      </IonGrid>
    </CardContainer>
  );
};

export default OrderDetails;
