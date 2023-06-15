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
import { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import styles from '../confirmOrderDetails/ConfirmOrderDetails.module.scss';
import Btnstyles from '../orderDetails/OrderDetails.module.scss';
import ConfirmOrderLogo from '../../static/assets/images/LohnpackLogo.svg';
import { useAppSelector } from '../../store/utils/hooks';
import useWebSocket from '../../store/hooks/useWebSocket';
import EditNumberQuantity from './EditNumberQuantity';
import Scanner from '../../static/assets/images/Scanner.svg';

const EditOrderDetails: React.FC = () => {
  const [barcodeState, setBarcodeState] = useState(false);
  const modal = useRef<HTMLIonModalElement>(null);
  const history = useHistory();

  const location = useLocation();

  useEffect(() => {
    const handleLocationChange = () => {
      const isConfirmOrderDetails =
        location.pathname === '/confirmorderdetails';
      setBarcodeState(isConfirmOrderDetails);
    };
    handleLocationChange(); // Set initial state based on current URL
    // Subscribe to location changes
    const unlisten = history.listen(handleLocationChange);
    return () => {
      // Unsubscribe from location changes when component unmounts
      unlisten();
    };
  }, [history, location.pathname]);

  const handleClick = useCallback(() => {
    setBarcodeState(true);
  }, []);

  const onBarcodeScanComplete = useCallback(() => {
    if (location.pathname === '/editorderdetails') {
      setBarcodeState(false); // Close the modal before navigating
      setTimeout(() => {
        history.push('/confirmorderdetails');
      }, 10);
    } else {
      history.push('/confirmorderdetails');
    }
  }, [history, location.pathname]);

  const closeModal = useCallback(() => {
    setBarcodeState(false);
  }, []);

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
  }, [history, ordernumbervalue, orderquantityvalue]);

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
                //  key={barcodeState ? 'modal-open' : 'modal-closed'}
                style={{
                  '--border-radius': '0px',
                  '--width': '100%',
                  '--height': '100%',
                }}
                ref={modal}
                isOpen={barcodeState}
                onDidDismiss={closeModal}
              >
                <button onClick={onBarcodeScanComplete}>
                  <IonImg
                    style={{
                      width: '100%',
                      height: '100vh',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    src={Scanner}
                  ></IonImg>
                </button>
              </IonModal>
            </IonGrid>
          </CardContainer>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default EditOrderDetails;
