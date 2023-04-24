import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from '@ionic/react';
import React, { useEffect } from 'react';
import styles from './OrderInforCard.module.scss';
import { useAppDispatch, useAppSelector } from '../../store/utils/hooks';
import { getTestData } from '../../store/slices/OrderInfoSlice';

const OrderInfoCard: React.FC = () => {
  const state = useAppSelector((state) => state.testslice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const promise = dispatch(getTestData());

    return () => {
      promise.abort();
    };
  }, [dispatch]);

  if (state.data === null) {
    return null;
  }

  return (
    <IonCard className={styles.orderInfoCard}>
      <IonCardHeader>
        <IonCardTitle>{state.data.name}</IonCardTitle>
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
