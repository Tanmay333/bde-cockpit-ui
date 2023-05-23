import { useCallback, useRef, useState } from 'react';
import CardContainer from '../common/cardContainer/CardContainer';
import {
  IonCardContent,
  IonGrid,
  IonButton,
  IonModal,
  IonRow,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from '../../store/utils/hooks';
import SelectWorkersIcon from '../../static/assets/images/SelectWorkersIcon';
import styles from './OrderDetails.module.scss';

const OrderDetails: React.FC = () => {
  const [barcodeState, setBarcodeState] = useState(false);
  const OrderId = useAppSelector((state) => state.machineDetailsSlice.data);
  const Members = useAppSelector((State) => State.SelectworkersSlice);
  const Quantity = useAppSelector((State) => State.OrderQuantitySlice);
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
    if (Members.data == null) {
      return null;
    }

    for (let i = 0; i - 1 < Members.data; i++) {
      icons.push(
        <IonRow
          key={i}
          style={{
            position: 'relative',
            textAlign: 'center',
            width: '10px',
            margin: '4px',
          }}
        >
          <SelectWorkersIcon isSelected />
        </IonRow>,
      );
    }

    return icons;
  };

  const data = {
    orderId: OrderId === null ? '--:--' : OrderId.assignedJobDetails.orderId,
    quantity: Quantity === null ? '--:--' : Quantity.data,
  };

  return (
    <CardContainer title="Order details" position={'start'}>
      <IonCardContent>
        <div className={styles.order}>
          <p>
            Order number:
            {data.orderId}
          </p>
          <p>Order quantity: {data.quantity}</p>
        </div>

        <IonRow
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            alignItems: 'center',
            color: '#333333',
          }}
        >
          Members:{renderSelectedIcons()}
        </IonRow>
      </IonCardContent>

      <IonGrid
        style={{
          textAlign: 'center',
        }}
      >
        <div className={styles.BtnContainer}>
          <IonButton
            type="submit"
            onClick={onClick}
            fill="solid"
            style={{
              width: '210px',
              height: '50px',
              borderRadius: '8px',
            }}
          >
            Scan bar-code
          </IonButton>
        </div>
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
