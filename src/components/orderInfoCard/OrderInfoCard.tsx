import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from '@ionic/react';
import React from 'react';
import styles from './OrderInforCard.module.scss';
import { useAppDispatch, useAppSelector } from '../../store/utils/hooks';
import { getMachineDetails } from '../../store/slices/machineDetailsSlice';

const OrderInfoCard: React.FC = () => {
  const state = useAppSelector((state) => state.machineDetailsSlice.data);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(getMachineDetails());
  };

  console.log(state, 'Data from redux store.');

  return (
    <IonCard className={styles.orderInfoCard}>
      <IonButton onClick={handleClick}>AAAAA</IonButton>
      <IonCardHeader>
        <IonCardTitle>Test Data</IonCardTitle>
        <IonCardSubtitle>Machine on</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>
        <div>
          <IonCardTitle>4:01 hrs</IonCardTitle>
          <IonCardSubtitle>Today</IonCardSubtitle>
        </div>
        <div>
          <IonCardTitle className={styles.ionRightSection}>
            4:01 hrs
          </IonCardTitle>
          <IonCardSubtitle>Phase 03 - Production</IonCardSubtitle>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default OrderInfoCard;
