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
import ConfirmOrderLogo from '../../static/assets/images/LohnpackLogo.svg';
import { useAppSelector } from '../../store/utils/hooks';
import useWebSocket from '../../store/hooks/useWebSocket';
import EditNumberQuantity from './EditNumberQuantity';
import { useTranslations } from '../../store/slices/translation.slice';
import Scan from '../common/scanner/Scan';
import LoadingIndicator from '../common/loadingIndicator/LoadingIndicator';

const EditOrderDetails: React.FC = () => {
  const translation = useTranslations();
  const [barcodeState, setBarcodeState] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const modal = useRef<HTMLIonModalElement>(null);
  const history = useHistory();
  const location = useLocation();
  const { sendMessage } = useWebSocket();

  // Detect location changes and toggle the barcode modal accordingly
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

  // Event handler for barcode scan completion
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

  // Event handler for closing the barcode modal
  const closeModal = useCallback(() => {
    setBarcodeState(false);
  }, []);

  // Get order quantity and order number from the store
  const orderquantityvalue = useAppSelector(
    (state) => state.OrderQuantitySlice.data,
  );
  const ordernumbervalue = useAppSelector(
    (state) => state.OrderNumberSlice.data,
  );

  const StationId = useAppSelector((state) => state.StationIdsSlice.value);

  // Event handler for the "Confirm Details" button click
  const onClick = useCallback(() => {
    // Prepare and send the WebSocket message with order details
    {
      const message = {
        action: 'assignNewJob',
        orderId: ordernumbervalue,
        stationId: StationId,
        orderQuantity: orderquantityvalue,
      };
      sendMessage(message);
    }
    // Update the phaseone element background color and navigate back to the main page
    const phaseone = document.getElementById('phase-one');
    if (phaseone) {
      phaseone.style.backgroundColor = '#2799D1';
    }
    // For time being add 3sec timeout,this logic will update later
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      history.push('/');
    }, 3000);
  }, [history, ordernumbervalue, orderquantityvalue]);

  return (
    <IonPage>
      <IonContent>
        {/* Loading spinner */}
        {isLoading && <LoadingIndicator />}
        <IonHeader className={styles.logo}>
          <IonImg src={ConfirmOrderLogo} alt={'ConfirmOrderDetails Logo'} />
        </IonHeader>
        <div className={styles.container}>
          <CardContainer
            title={translation.text.orderDetails}
            position={'middle'}
          >
            <IonText className={styles.orderDetails}>
              <EditNumberQuantity />
            </IonText>
            <IonGrid style={{ textAlign: 'center' }}>
              <IonButton
                onClick={onClick}
                fill="solid"
                className={styles.btn}
                disabled={!orderquantityvalue || !ordernumbervalue}
              >
                {translation.buttons.confirmDetails}
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
                  {translation.buttons.scanAgain}
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
                  <Scan />
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
