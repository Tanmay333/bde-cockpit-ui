import { useCallback, useRef, useState } from 'react';
import CardContainer from '../common/cardContainer/CardContainer';
import {
  IonCardContent,
  IonGrid,
  IonButton,
  IonModal,
  IonRow,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from '../../store/utils/hooks';
import SelectWorkersIcon from '../../static/assets/images/SelectWorkersIcon';
import styles from './OrderDetails.module.scss';

const OrderDetails: React.FC = () => {
  const state = useAppSelector((state) => state.machineDetailsSlice.data);
  const [barcodeState, setBarcodeState] = useState(false);
  const modal = useRef<HTMLIonModalElement>(null);
  const history = useHistory();
  const onClick = useCallback(() => {
    setBarcodeState(true);
  }, [barcodeState]);
  const onBarcodeScanComplete = useCallback(() => {
    history.push('/confirmorderdetails');
    setBarcodeState(false);
  }, [history]);

  const renderSelectedIcons = () => {
    const icons = [];
    if (state == null || state.assignedJobDetails.productionTeamSize === null) {
      return null;
    }
    for (let i = 0; i - 1 < state.assignedJobDetails.productionTeamSize; i++) {
      icons.push(
        <IonRow
          key={i}
          style={{
            position: 'relative',
            textAlign: 'center',
            width: '10px',
            margin: '4px',
          }}
        >
          <SelectWorkersIcon isSelected />
        </IonRow>,
      );
    }

    return icons;
  };

  const data = {
    orderId: state === null ? '--:--' : state.assignedJobDetails.orderId,
    quantity: state === null ? '--:--' : state.assignedJobDetails.quantity,
  };

  const isPhasePreparing = () => {
    if (state === null) {
      return false;
    } else if (state.process.currentPhaseDetails.phaseName !== 'mounting') {
      return true;
    }
  };
  return (
    <CardContainer title="Order details" position={'start'}>
      <IonCardContent>
        <div className={styles.order}>
          <p>Order number: {data.orderId} </p>
          <p>Order quantity: {data.quantity}</p>
        </div>
        {isPhasePreparing() && (
          <IonRow
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'flex-start',
              alignItems: 'center',
              color: '#333333',
            }}
          >
            Members:{renderSelectedIcons()}
          </IonRow>
        )}
      </IonCardContent>

      <IonGrid
        style={{
          textAlign: 'center',
        }}
      >
        <div className={styles.BtnContainer}>
          <IonButton
            type="submit"
            onClick={onClick}
            fill="solid"
            style={{
              width: '210px',
              height: '50px',
              borderRadius: '8px',
            }}
          >
            Scan bar-code
          </IonButton>
        </div>
        <IonModal
          style={{
            '--border-radius': '0px',
            '--width': '100%',
            '--height': '100%',
          }}
          ref={modal}
          isOpen={barcodeState}
        >
          <IonButton
            onClick={onBarcodeScanComplete}
            fill="solid"
            style={{
              width: '210px',

              height: '50px',
            }}
          >
            Sample scanner
          </IonButton>
        </IonModal>
      </IonGrid>
    </CardContainer>
  );
};

export default OrderDetails;
