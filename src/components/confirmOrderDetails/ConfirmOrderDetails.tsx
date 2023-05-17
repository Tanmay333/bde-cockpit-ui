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
import { getMachineDetails } from '../../store/slices/machineDetailsSlice';
import { useAppDispatch, useAppSelector } from '../../store/utils/hooks';
import { getquantityDetails } from '../../store/slices/orderQuantitySlice';

const ConfirmOrderDetails = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [enteredQuantity, setEnteredQuantity] = useState(Number);

  const onChangeQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    const parsedNumber = parseFloat(event.target.value);
    setEnteredQuantity(parsedNumber);
    console.log(event.target.value);
  };

  const orderquantityvalue = useAppSelector(
    (state) => state.OrderQuantitySlice.data,
  );

  useEffect(() => {
    dispatch(getquantityDetails(enteredQuantity));
  }, [dispatch, enteredQuantity]);

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
  const handleInputChange = (event: { target: { value: string | any[] } }) => {
    let inputValue = event.target.value;
    if (inputValue.length > 20) {
      inputValue = inputValue.slice(0, 20);
    }
    if (Number(inputValue) < 0) {
      inputValue = '0';
    }
    event.target.value = inputValue;
  };

  const onClick = useCallback(() => {
    dispatch(
      getMachineDetails({
        action: 'assignNewJob',
        orderId: '1869485',
        stationId: '1.203.4.245',
        orderQuantity: orderquantityvalue,
      }),
    );
    const phaseone = document.getElementById('phase-one');
    if (phaseone) {
      phaseone.style.backgroundColor = '#2799D1';
    }
    history.push('/');
  }, [history]);

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
                  onChange={handleInputChange}
                  //onChange={onChangeQuantity}
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
