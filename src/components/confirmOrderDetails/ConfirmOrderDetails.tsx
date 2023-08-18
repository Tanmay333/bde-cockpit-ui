import {
  IonPage,
  IonContent,
  IonButton,
  IonText,
  IonHeader,
  IonImg,
  IonModal,
  IonGrid,
  IonIcon,
} from '@ionic/react';
import CardContainer from '../common/cardContainer/CardContainer';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import styles from './ConfirmOrderDetails.module.scss';
import ConfirmOrderLogo from '../../static/assets/images/LohnpackLogo.svg';
import { useAppDispatch, useAppSelector } from '../../store/utils/hooks';
import { getquantityDetails } from '../../store/slices/orderQuantitySlice';
import useWebSocket from '../../store/hooks/useWebSocket';
import { MachineDetails } from '../../store/slices/machineDetailsSlice';
import { getnumberDetails } from '../../store/slices/orderNumber';
import editIcon from '../../static/assets/images/Edit.svg';
import { useTranslations } from '../../store/slices/translation.slice';
import Scan from '../common/scanner/Scan';

// ConfirmOrderDetails component
const ConfirmOrderDetails: React.FC = () => {
  const translation = useTranslations();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [enteredQuantity, setEnteredQuantity] = useState(Number);
  const [barcodeState, setBarcodeState] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [pressedKeys, setPressedKeys] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  const modal = useRef<HTMLIonModalElement>(null);
  // Access machine details from Redux store using useSelector hook
  const state = useAppSelector<MachineDetails | null>(
    (state) => state.machineDetailsSlice.data,
  );
  const data = {
    orderId: state?.assignedJobDetails?.orderId ?? '--:--',
    quantity: state?.assignedJobDetails?.quantity ?? '--:--',
  };

  const [orderNumber, setOrderNumber] = useState(data.orderId);

  // Handle order number change event
  const handleOrderNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newOrderNumber = event.target.value;
    setOrderNumber(newOrderNumber);
  };

  // Handle order quantity change event
  const onChangeQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    const parsedNumber = parseFloat(event.target.value);
    setEnteredQuantity(parsedNumber);
  };
  // Get order quantity and order number values from Redux store
  const orderquantityvalue = useAppSelector(
    (state) => state.OrderQuantitySlice.data,
  );

  const ordernumbervalue = useAppSelector(
    (state) => state.OrderNumberSlice.data,
  );

  // Dispatch Redux actions when order quantity or order number changes
  useEffect(() => {
    dispatch(getquantityDetails(enteredQuantity));
    dispatch(getnumberDetails(orderNumber));
  }, [dispatch, enteredQuantity, orderNumber]);

  // Handle key press event for order number input field
  const handleKeyPress = (event: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    target: any;
    key: string;
    preventDefault: () => void;
  }) => {
    const invalidChars = ['+', '-', 'e', 'E'];
    if (invalidChars.includes(event.key) || event.target.value.length >= 20) {
      event.preventDefault();
    }
  };

  // Enter edit mode for order number
  const enterEditMode = useCallback(() => {
    setIsEditMode(true);
  }, []);

  // Handle click event for barcode scanning button
  const handleClick = useCallback(() => {
    setBarcodeState(true);
  }, []);

  // Handle barcode scanning completion event
  const onBarcodeScanComplete = useCallback(() => {
    history.push('/confirmorderdetails');
    setBarcodeState(false);
  }, [history]);

  // Access StationId from Redux store using useSelector hook
  const StationId = useAppSelector((state) => state.StationIdsSlice.value);
  const { sendMessage } = useWebSocket();

  // Handle click event for Confirm button
  const onClick = useCallback(() => {
    const message = {
      action: 'assignNewJob',
      orderId: pressedKeys.join(''),
      stationId: StationId,
      orderQuantity: orderquantityvalue,
    };
    sendMessage(message);

    // Change background color and redirect to the homepage
    const phaseone = document.getElementById('phase-one');
    if (phaseone) {
      phaseone.style.backgroundColor = '#2799D1';
    }
    history.push('/');
  }, [history, orderquantityvalue, ordernumbervalue]);

  // JSX for right-aligned edit icon button
  const right = (
    <IonButton fill="clear" size="small" onClick={enterEditMode}>
      <IonIcon
        style={{ fontSize: '25px', stroke: 'var(--ion-color-primary)' }}
        src={editIcon}
        slot="icon-only"
      ></IonIcon>
    </IonButton>
  );

  // Handle key press event for input field focus management
  useEffect(() => {
    const keypressHandler = (e: KeyboardEvent) => {
      const isNumber = /^[0-9]$/;

      if (isNumber.test(e.key)) {
        setPressedKeys((prevKeys) => {
          const newKeys = prevKeys.slice();
          if (e.keyCode === 13) {
            newKeys.push('\n'); // Add a new line if Enter key (keyCode 13) is pressed
          } else {
            newKeys.push(e.key); // Add the pressed key if it's a number
          }
          return newKeys;
        });
      }
    };
    // Add or remove key press event listener based on input field focus
    if (!isFocused) {
      document.addEventListener('keypress', keypressHandler);
    } else {
      document.removeEventListener('keypress', keypressHandler);
    }
    // Clean up the event listener on unmount
    return () => {
      document.removeEventListener('keypress', keypressHandler);
    };
  }, [isFocused]);

  // Handle focus event for input field
  const handleFocus = () => {
    setIsFocused(true);
  };
  // Handle blur event for input field
  const handleBlur = () => {
    setIsFocused(false);
  };

  // Add focus and blur event listeners for input field
  useEffect(() => {
    const inputElement = document.getElementById('orderQuantity');
    if (inputElement) {
      inputElement.addEventListener('focus', handleFocus);
      inputElement.addEventListener('blur', handleBlur);
    }
    return () => {
      if (inputElement) {
        inputElement.removeEventListener('focus', handleFocus);
        inputElement.removeEventListener('blur', handleBlur);
      }
    };
  }, [isFocused]);

  return (
    <IonPage>
      <IonContent>
        <IonHeader className={styles.logo}>
          <IonImg src={ConfirmOrderLogo} alt={'ConfirmOrderDetails Logo'} />
        </IonHeader>
        <div className={styles.container}>
          <CardContainer
            title={translation.text.orderDetails}
            right={right}
            position={'middle'}
          >
            <IonText className={styles.orderDetails}>
              {/* Conditional rendering based on edit mode */}
              {isEditMode ? (
                <p>
                  {translation.text.orderNumber}:
                  <input
                    className={styles.focus}
                    type="number"
                    value={orderNumber}
                    onKeyDown={handleKeyPress}
                    onChange={handleOrderNumberChange}
                    required
                  />
                </p>
              ) : (
                <p>
                  {' '}
                  {translation.text.orderNumber}:{' '}
                  {pressedKeys.length === 0 ? '--:--' : pressedKeys}
                </p>
              )}
              <p>
                {translation.text.orderQuantity}:
                <input
                  id="orderQuantity"
                  className={styles.focus}
                  type="number"
                  min="0"
                  onKeyDown={handleKeyPress}
                  onChange={onChangeQuantity}
                  placeholder={translation.text.enterOrderQuantity}
                  required
                  disabled={pressedKeys.length === 0}
                />
              </p>
            </IonText>

            <IonButton
              onClick={onClick}
              fill="solid"
              className={styles.btn}
              disabled={!enteredQuantity || pressedKeys.length === 0}
            >
              {translation.buttons.confirmDetails}
            </IonButton>
            <IonGrid style={{ textAlign: 'center' }}>
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
                key="2"
                style={{
                  '--border-radius': '0px',
                  '--width': '100%',
                  '--height': '100%',
                }}
                ref={modal}
                isOpen={barcodeState}
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

export default ConfirmOrderDetails;
