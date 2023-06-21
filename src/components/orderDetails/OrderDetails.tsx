import React, { useCallback, useRef, useState } from 'react';
import CardContainer from '../common/cardContainer/CardContainer';
import {
  IonCardContent,
  IonGrid,
  IonButton,
  IonModal,
  IonRow,
  IonImg,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from '../../store/utils/hooks';
import SelectTeamSizeIcon from '../../static/assets/images/SelectTeamSizeIcon';
import styles from './OrderDetails.module.scss';
import { MachineDetails } from '../../store/slices/machineDetailsSlice';
import Scanner from '../../static/assets/images/Scanner.svg';
import { useTranslations } from '../../store/slices/translation.slice';

const OrderDetails: React.FC = () => {
  const translation = useTranslations();

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
  }, []);

  const editorderdetails = useCallback(() => {
    history.push('/editorderdetails');
  }, []);

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
          <SelectTeamSizeIcon isSelected />
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
    <CardContainer title={translation.text.orderDetails} position="start">
      <IonCardContent>
        <div className={styles.order}>
          <p>
            {translation.text.orderNumber}: {data.orderId}{' '}
          </p>
          <p>
            {translation.text.orderQuantity}: {data.quantity}
          </p>
        </div>
        {isPhasePreparing() && (
          <IonRow className={styles.worker}>
            {translation.text.members}: {renderSelectedIcons()}
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
              {translation.buttons.scanBarCode}
            </IonButton>
          )}
        </div>
        <IonModal
          key="1"
          style={{
            '--border-radius': '0px',
            '--width': '100%',
            '--height': '100%',
          }}
          ref={modal}
          isOpen={barcodeState}
        >
          <button onClick={onBarcodeScanComplete}>
            <IonImg
              style={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              src={Scanner}
            ></IonImg>
          </button>
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
              {translation.buttons.editOrderDetails}
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
              {translation.buttons.editMemberDetails}
            </IonButton>
          )}
        </div>
      </IonGrid>
    </CardContainer>
  );
};

export default OrderDetails;
