import { useCallback, useRef, useState } from 'react';
import CardContainer from '../common/cardContainer/CardContainer';
import {
  IonCardContent,
  IonGrid,
  IonButton,
  IonList,
  IonModal,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import styles from './OrderDetails.module.scss';

const OrderDetails: React.FC = () => {
  const [barcodeState, setBarcodeState] = useState(false);

  const modal = useRef<HTMLIonModalElement>(null);
  const history = useHistory();

  const onClick = useCallback(() => {
    setBarcodeState(true);
  }, [barcodeState]);

  const onBarcodeScanComplete = useCallback(() => {
    history.push('/confirmorderdetails');
    setBarcodeState(false);
  }, [history]);

  return (
    <>
      <CardContainer title="Order details" position={'start'}>
        <IonCardContent>
          <div className={styles.order}>
            <p>Order number: --</p>
            <p>Order quantity: --</p>
          </div>
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
    </>
  );
};

export default OrderDetails;
