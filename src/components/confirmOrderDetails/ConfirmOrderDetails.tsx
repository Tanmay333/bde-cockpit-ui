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

const ConfirmOrderDetails = () => {
  const history = useHistory();

  const onClick = useCallback(() => {
    history.push('/');
  }, [history]);

  return (
    <>
      <IonPage>
        <IonContent>
          <IonHeader className={styles.logo}>
            <IonImg src={ConfirmOrderLogo} alt={'ConfirmOrderDetails Logo'} />
          </IonHeader>
          <div className={styles.container}>
            <CardContainer title={'Order details'} position={'middle'}>
              <IonText className={styles.orderDetails}>
                <p>Order number: 382993844</p>
                <p>Order quantity: 3,000</p>
              </IonText>
              <IonButton onClick={onClick} fill="solid" className={styles.btn}>
                Confirm Order Details
              </IonButton>
            </CardContainer>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default ConfirmOrderDetails;
