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

  const onClick = useCallback(() => {
    dispatch(
      getMachineDetails({
        action: 'assignNewJob',
        orderId: '1869485',
        stationId: '1.203.4.245',
        orderQuantity: 5000,
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
              <p>Order number: 382993844</p>

              <p>
                Order quantity:
                <input type="number" placeholder="Enter order quantity" />
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
