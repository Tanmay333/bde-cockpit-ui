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
import SelectTeamSizeIcon from '../../static/assets/images/SetTeamSizeIcon';
import styles from './OrderDetails.module.scss';
import { MachineDetails } from '../../store/slices/machineDetailsSlice';
import { useTranslations } from '../../store/slices/translation.slice';
import Scan from '../common/scanner/Scan';

const OrderDetails: React.FC = () => {
  const translation = useTranslations();
  const [barcodeState, setBarcodeState] = useState(false);
  const modal = useRef<HTMLIonModalElement>(null);
  const history = useHistory();
  const state = useAppSelector<MachineDetails | null>(
    (state) => state.machineDetailsSlice.data,
  );

  // Event handler for clicking the "Scan Barcode" button
  const onClick = useCallback(() => {
    setBarcodeState(true);
  }, []);

  // Event handler for barcode scan completion
  const onBarcodeScanComplete = useCallback(() => {
    history.push('/confirmorderdetails');
    setBarcodeState(false);
  }, []);

  // Event handler for clicking the "Edit Order Details" button
  const editorderdetails = useCallback(() => {
    history.push('/editorderdetails');
  }, []);

  // Event handler for clicking the "Edit Team Size" button
  const editmemberdetails = useCallback(() => {
    history.push('/editteamsize');
  }, [history]);

  // Function to render the selected team size icons
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

  // Function to check if the current phase is null
  const isPhaseNull =
    state?.process &&
    state.process.currentPhaseDetails &&
    state?.process.currentPhaseDetails.phaseName === null;

  // Function to check if the current phase is 'mounting'
  const isPhaseMounting =
    state?.process &&
    state.process.currentPhaseDetails &&
    state?.process.currentPhaseDetails.phaseName === 'mounting';

  // Function to check if the current phase is 'preparing'
  const isPhasePreparation =
    state?.process &&
    state.process.currentPhaseDetails &&
    state?.process.currentPhaseDetails.phaseName === 'preparing';

  // Data for order number and quantity
  const data = {
    orderId: state?.assignedJobDetails?.orderId ?? '--:--',
    quantity: state?.assignedJobDetails?.quantity ?? '--:--',
  };

  // Function to check if the phase is preparing
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
          <span>
            {translation.text.orderNumber}: {data.orderId} <br />
          </span>
          <span>
            {translation.text.orderQuantity}: {data.quantity}
          </span>
        </div>
        {/* Render selected icons if the phase is preparing */}
        {isPhasePreparing() && (
          <IonRow className={styles.worker}>
            {translation.text.members}: {renderSelectedIcons()}
          </IonRow>
        )}
      </IonCardContent>

      <IonGrid style={{ textAlign: 'center' }}>
        {/* "Scan Barcode" button */}
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
            <Scan />
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
         {/* "Edit Member Details" button */}
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
