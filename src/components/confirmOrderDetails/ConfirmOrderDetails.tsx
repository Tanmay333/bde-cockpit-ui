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
import editIcon from '../../static/assets/images/edit.svg';
import { useTranslations } from '../../store/slices/translation.slice';
import Scan from '../common/Scanner/Scan';

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
  const state = useAppSelector<MachineDetails | null>(
    (state) => state.machineDetailsSlice.data,
  );
  const data = {
    orderId: state?.assignedJobDetails?.orderId ?? '--:--',
    quantity: state?.assignedJobDetails?.quantity ?? '--:--',
  };

  const [orderNumber, setOrderNumber] = useState(data.orderId);

  const handleOrderNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newOrderNumber = event.target.value;
    setOrderNumber(newOrderNumber);
  };

  const onChangeQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    const parsedNumber = parseFloat(event.target.value);
    setEnteredQuantity(parsedNumber);
  };

  const orderquantityvalue = useAppSelector(
    (state) => state.OrderQuantitySlice.data,
  );

  const ordernumbervalue = useAppSelector(
    (state) => state.OrderNumberSlice.data,
  );

  useEffect(() => {
    dispatch(getquantityDetails(enteredQuantity));
    dispatch(getnumberDetails(orderNumber));
  }, [dispatch, enteredQuantity, orderNumber]);

  const handleKeyPress = (event: {
    target: any;
    key: string;
    preventDefault: () => void;
  }) => {
    const invalidChars = ['+', '-', 'e', 'E'];
    if (invalidChars.includes(event.key) || event.target.value.length >= 20) {
      event.preventDefault();
    }
  };

  const enterEditMode = useCallback(() => {
    setIsEditMode(true);
  }, []);

  const handleClick = useCallback(() => {
    setBarcodeState(true);
  }, []);

  const onBarcodeScanComplete = useCallback(() => {
    history.push('/confirmorderdetails');
    setBarcodeState(false);
  }, [history]);

  const StationId = useAppSelector((state) => state.StationIdsSlice.value);
  const { sendMessage } = useWebSocket();
  const onClick = useCallback(() => {
    const message = {
      action: 'assignNewJob',
      orderId: pressedKeys.join(''),
      stationId: StationId,
      orderQuantity: orderquantityvalue,
    };
    sendMessage(message);

    const phaseone = document.getElementById('phase-one');
    if (phaseone) {
      phaseone.style.backgroundColor = '#2799D1';
    }
    history.push('/');
  }, [history, orderquantityvalue, ordernumbervalue]);

  const right = (
    <IonButton fill="clear" size="small" onClick={enterEditMode}>
      <IonIcon
        style={{ fontSize: '25px', stroke: 'var(--ion-color-primary)' }}
        src={editIcon}
        slot="icon-only"
      ></IonIcon>
    </IonButton>
  );

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

    if (!isFocused) {
      document.addEventListener('keypress', keypressHandler);
    } else {
      document.removeEventListener('keypress', keypressHandler);
    }

    return () => {
      document.removeEventListener('keypress', keypressHandler);
    };
  }, [isFocused]);

  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };

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
