import React, { useCallback, useRef, useState } from 'react';
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
import SelectWorkersIcon from '../../static/assets/images/SelectTeamSizeIcon';
import styles from './OrderDetails.module.scss';
import { MachineDetails } from '../../store/slices/machineDetailsSlice';

const OrderDetails: React.FC = () => {
  const state = useAppSelector<MachineDetails | null>(
    (state) => state.machineDetailsSlice.data,
  );
  const [barcodeState, setBarcodeState] = useState(false);
  const modal = useRef<HTMLIonModalElement>(null);
  const history = useHistory();

  const onClick = useCallback(() => {
    setBarcodeState(true);
  }, []);

  const onBarcodeScanComplete = useCallback(() => {
    history.push('/confirmorderdetails');
    setBarcodeState(false);
  }, [history]);

  const editorderdetails = useCallback(() => {
    history.push('/editorderdetails');
  }, [history]);

  const editmemberdetails = useCallback(() => {
    history.push('/editteamsize');
  }, [history]);

  const renderSelectedIcons = () => {
    const icons = [];
    if (state == null || state.assignedJobDetails.productionTeamSize === null) {
      return null;
    }
    for (let i = 0; i < state.assignedJobDetails.productionTeamSize; i++) {
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

  const isPhaseNull =
    state?.process &&
    state.process.currentPhaseDetails &&
    state?.process.currentPhaseDetails.phaseName === null;

  const isPhaseMounting =
    state?.process &&
    state.process.currentPhaseDetails &&
    state?.process.currentPhaseDetails.phaseName === 'mounting';

  const isPhasePreparation =
    state?.process &&
    state.process.currentPhaseDetails &&
    state?.process.currentPhaseDetails.phaseName === 'preparing';

  const data = {
    orderId: state?.assignedJobDetails?.orderId ?? '--:--',
    quantity: state?.assignedJobDetails?.quantity ?? '--:--',
  };

  const isPhasePreparing = () => {
    if (
      state == null ||
      state.process == null ||
      state.process.currentPhaseDetails == null ||
      state.process.currentPhaseDetails.state === null
    ) {
      return false;
    } else if (state.process.currentPhaseDetails.phaseName !== 'mounting') {
      return true;
    }
    return false;
  };

  return (
    <CardContainer title="Order details" position="start">
      <IonCardContent>
        <div className={styles.order}>
          <p>Order number: {data.orderId} </p>
          <p>Order quantity: {data.quantity}</p>
        </div>
        {isPhasePreparing() && (
          <IonRow className={styles.worker}>
            Members: {renderSelectedIcons()}
          </IonRow>
        )}
      </IonCardContent>

      <IonGrid style={{ textAlign: 'center' }}>
        <div className={styles.BtnContainer}>
          {isPhaseNull && (
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
          )}
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
        <div className={styles.BtnContainer}>
          {isPhaseMounting && (
            <IonButton
              onClick={editorderdetails}
              type="submit"
              fill="solid"
              style={{
                width: '210px',
                height: '50px',
                borderRadius: '8px',
              }}
            >
              Edit order details
            </IonButton>
          )}
        </div>
        <div className={styles.BtnContainer}>
          {isPhasePreparation && (
            <IonButton
              onClick={editmemberdetails}
              type="submit"
              fill="solid"
              style={{
                width: '210px',
                height: '50px',
                borderRadius: '8px',
              }}
            >
              Edit Member details
            </IonButton>
          )}
        </div>
      </IonGrid>
    </CardContainer>
  );
};

export default OrderDetails;
