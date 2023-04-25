import { IonPage, IonContent, IonButton } from '@ionic/react';
import CardContainer from '../common/cardContainer/CardContainer';
import { useCallback } from 'react';
import { useHistory } from 'react-router';

const ConfirmOrderDetails = () => {
  const history = useHistory();

  const onClick = useCallback(() => {
    history.push('/');
  }, [history]);

  return (
    <IonPage>
      <IonContent>
        <CardContainer title={'Order details'}>
          <IonButton
            onClick={onClick}
            fill="solid"
            style={{
              width: '210px',
              height: '50px',
            }}
          >
            Confirm Order Details
          </IonButton>
        </CardContainer>
      </IonContent>
    </IonPage>
  );
};

export default ConfirmOrderDetails;
