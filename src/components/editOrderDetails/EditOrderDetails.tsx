import {
  IonPage,
  IonContent,
  IonButton,
  IonText,
  IonHeader,
  IonImg,
  IonIcon,
  IonRow,
  IonGrid,
  IonModal,
} from '@ionic/react';
import CardContainer from '../common/cardContainer/CardContainer';
import { useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import styles from '../confirmOrderDetails/ConfirmOrderDetails.module.scss';
import ConfirmOrderLogo from '../../static/assets/images/LohnpackLogo.svg';
import { useAppSelector } from '../../store/utils/hooks';
import useWebSocket from '../../store/hooks/useWebSocket';
import editIcon from '../../static/assets/images/edit.svg';
import { MachineDetails } from '../../store/slices/machineDetailsSlice';
import SelectWorkersIcon from '../../static/assets/images/SelectWorkersIcon';
import EditTeamSize from './EditTeamSize';
import EditNumberQuantity from './EditNumberQuantity';

const EditOrderDetails: React.FC = () => {
  const history = useHistory();
  const [barcodeState, setBarcodeState] = useState(false);
  const modal = useRef<HTMLIonModalElement>(null);

  const handleClick = useCallback(() => {
    setBarcodeState(true);
  }, []);

  const onBarcodeScanComplete = useCallback(() => {
    history.push('/confirmorderdetails');
    setBarcodeState(false);
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

  const { sendMessage } = useWebSocket();

  const state = useAppSelector<MachineDetails | null>(
    (state) => state.machineDetailsSlice.data,
  );
  const data = {
    orderId: state?.assignedJobDetails?.orderId ?? '--:--',
    quantity: state?.assignedJobDetails?.quantity ?? '--:--',
  };

  const [isEditMode, setIsEditMode] = useState(false);

  const enterEditMode = () => {
    setIsEditMode(true);
  };

  const orderquantityvalue = useAppSelector(
    (state) => state.OrderQuantitySlice.data,
  );
  const ordernumbervalue = useAppSelector(
    (state) => state.OrderNumberSlice.data,
  );

  const onClick = useCallback(() => {
    if (isEditMode) {
      const message = {
        action: 'assignNewJob',
        orderId: ordernumbervalue,
        stationId: '1.203.4.245',
        orderQuantity: orderquantityvalue,
      };

      sendMessage(message);
    }

    const phaseone = document.getElementById('phase-one');
    if (phaseone) {
      phaseone.style.backgroundColor = '#2799D1';
    }
    history.push('/');
  }, [history, isEditMode, ordernumbervalue, orderquantityvalue, sendMessage]);

  const right = (
    <IonButton fill="clear" size="small" onClick={enterEditMode}>
      <IonIcon
        style={{ fontSize: '25px', stroke: 'var(--ion-color-primary)' }}
        src={editIcon}
        slot="icon-only"
      ></IonIcon>
    </IonButton>
  );

  return (
    <IonPage>
      <IonContent>
        <IonHeader className={styles.logo}>
          <IonImg src={ConfirmOrderLogo} alt={'ConfirmOrderDetails Logo'} />
        </IonHeader>
        <div className={styles.container}>
          <CardContainer
            title={'Order details'}
            right={right}
            position={'middle'}
          >
            <IonText className={styles.orderDetails}>
              {isEditMode ? (
                <>
                  <EditNumberQuantity />
                  {isPhasePreparing() && <EditTeamSize />}
                </>
              ) : (
                <>
                  <p>Order number: {data.orderId}</p>
                  <p>Order quantity: {data.quantity}</p>

                  {isPhasePreparing() && (
                    <IonRow
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: '#333333',
                      }}
                    >
                      Members: {renderSelectedIcons()}
                    </IonRow>
                  )}
                </>
              )}
            </IonText>
            <IonButton onClick={onClick} fill="solid" className={styles.btn}>
              Confirm Details
            </IonButton>
            <IonGrid style={{ textAlign: 'center' }}>
              <div className={styles.BtnContainer}>
                <IonButton
                  type="submit"
                  onClick={handleClick}
                  fill="clear"
                  style={{
                    width: '210px',
                    height: '50px',
                    borderRadius: '8px',
                  }}
                >
                  Scan again
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
        </div>
      </IonContent>
    </IonPage>
  );
};

export default EditOrderDetails;
