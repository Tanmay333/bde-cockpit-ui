import {
  IonPage,
  IonContent,
  IonButton,
  IonText,
  IonHeader,
  IonImg,
} from '@ionic/react';
import CardContainer from '../common/cardContainer/CardContainer';
import { useCallback } from 'react';
import { useHistory } from 'react-router';
import styles from './ConfirmOrderDetails.module.scss';
import ConfirmOrderLogo from '../../static/assets/images/LohnpackLogo.svg';
import { getMachineDetails } from '../../store/slices/machineDetailsSlice';
import { useAppDispatch } from '../../store/utils/hooks';

const ConfirmOrderDetails = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
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
        orderQuantity: 5000,
      }),
    );
    history.push('/');
  }, [history]);

  return (
    <IonPage>
      <IonContent>
        <IonHeader className={styles.logo}>
          <IonImg src={ConfirmOrderLogo} alt={'ConfirmOrderDetails Logo'} />
        </IonHeader>
        <div className={styles.container}>
          <CardContainer
            title={'Order details'}
            position={'middle'}
            style={{ paddingTop: '36px' }}
          >
            <IonText className={styles.orderDetails}>
              <p>Order number: 382993844</p>
              <p>
                {' '}
                Order quantity:
                <input
                  className={styles.focus}
                  type="number"
                  min="0"
                  onKeyPress={handleKeyPress}
                  onChange={handleInputChange}
                />
              </p>
            </IonText>
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
