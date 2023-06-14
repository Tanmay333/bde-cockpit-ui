import {
  IonPage,
  IonContent,
  IonButton,
  IonText,
  IonHeader,
  IonImg,
  IonGrid,
  IonModal,
} from '@ionic/react';
import CardContainer from '../common/cardContainer/CardContainer';
import { useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import styles from '../confirmOrderDetails/ConfirmOrderDetails.module.scss';
import ConfirmOrderLogo from '../../static/assets/images/LohnpackLogo.svg';
import { useAppSelector } from '../../store/utils/hooks';
import useWebSocket from '../../store/hooks/useWebSocket';
import EditNumberQuantity from './EditNumberQuantity';

const EditOrderDetails: React.FC = () => {
  const history = useHistory();
  const [barcodeState, setBarcodeState] = useState(false);
  const modal = useRef<HTMLIonModalElement>(null);

  const handleClick = useCallback(() => {
    setBarcodeState(true);
  }, []);

  const onBarcodeScanComplete = useCallback(() => {
    history.push('/confirmorderdetails');
    setBarcodeState(false);
  }, [history]);

  const { sendMessage } = useWebSocket();

  const orderquantityvalue = useAppSelector(
    (state) => state.OrderQuantitySlice.data,
  );
  const ordernumbervalue = useAppSelector(
    (state) => state.OrderNumberSlice.data,
  );

  const onClick = useCallback(() => {
    {
      const message = {
        action: 'assignNewJob',
        orderId: ordernumbervalue,
        stationId: '1.203.4.245',
        orderQuantity: orderquantityvalue,
      };

      sendMessage(message);
    }

    const phaseone = document.getElementById('phase-one');
    if (phaseone) {
      phaseone.style.backgroundColor = '#2799D1';
    }
    history.push('/');
  }, [history, ordernumbervalue, orderquantityvalue, sendMessage]);

  return (
    <IonPage>
      <IonContent>
        <IonHeader className={styles.logo}>
          <IonImg src={ConfirmOrderLogo} alt={'ConfirmOrderDetails Logo'} />
        </IonHeader>
        <div className={styles.container}>
          <CardContainer title={'Order details'} position={'middle'}>
            <IonText className={styles.orderDetails}>
              <EditNumberQuantity />
            </IonText>
            <IonGrid style={{ textAlign: 'center' }}>
              <IonButton onClick={onClick} fill="solid" className={styles.btn}>
                Confirm Details
              </IonButton>
              <div className={styles.BtnContainer}>
                <IonButton
                  type="submit"
                  onClick={handleClick}
                  fill="clear"
                  style={{
                    width: '210px',
                    height: '50px',
                    borderRadius: '8px',
                  }}
                >
                  Scan again
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
        </div>
      </IonContent>
    </IonPage>
  );
};

export default EditOrderDetails;
