import {
  IonPage,
  IonContent,
  IonButton,
  IonText,
  IonHeader,
  IonImg,
} from '@ionic/react';
import CardContainer from '../common/cardContainer/CardContainer';
import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import styles from './ConfirmOrderDetails.module.scss';
import ConfirmOrderLogo from '../../static/assets/images/LohnpackLogo.svg';
import { useAppDispatch, useAppSelector } from '../../store/utils/hooks';
import { getquantityDetails } from '../../store/slices/orderQuantitySlice';
import useWebSocket from '../../store/hooks/useWebSocket';

const ConfirmOrderDetails = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [enteredQuantity, setEnteredQuantity] = useState(Number);

  const onChangeQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    const parsedNumber = parseFloat(event.target.value);
    setEnteredQuantity(parsedNumber);
  };

  const orderquantityvalue = useAppSelector(
    (state) => state.OrderQuantitySlice.data,
  );

  useEffect(() => {
    dispatch(getquantityDetails(enteredQuantity));
  }, [dispatch, enteredQuantity]);

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

  const { sendMessage } = useWebSocket();

  const onClick = useCallback(() => {
    const message = {
      action: 'assignNewJob',
      orderId: '1869485',
      stationId: '1.203.4.245',
      orderQuantity: orderquantityvalue,
    };
    sendMessage(message);

    const phaseone = document.getElementById('phase-one');
    if (phaseone) {
      phaseone.style.backgroundColor = '#2799D1';
    }
    history.push('/');
  }, [history, orderquantityvalue]);

  return (
    <IonPage>
      <IonContent>
        <IonHeader className={styles.logo}>
          <IonImg src={ConfirmOrderLogo} alt={'ConfirmOrderDetails Logo'} />
        </IonHeader>
        <div className={styles.container}>
          <CardContainer title={'Order details'} position={'middle'}>
            <IonText className={styles.orderDetails}>
              <p>Order number: 1869485</p>

              <p>
                Order quantity:
                <input
                  className={styles.focus}
                  type="number"
                  min="0"
                  onKeyDown={handleKeyPress}
                  onChange={onChangeQuantity}
                  placeholder="Enter order quantity"
                  required
                />
              </p>
            </IonText>
            {/* {enteredQuantity !== undefined && (
              <p>Entered quantity: {enteredQuantity}</p>
            )} */}

            <IonButton onClick={onClick} fill="solid" className={styles.btn}>
              Confirm Order Details
            </IonButton>
          </CardContainer>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ConfirmOrderDetails;
