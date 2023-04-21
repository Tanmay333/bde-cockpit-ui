import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import React from "react";
import styles from "./OrderInforCard.module.scss";

const OrderInfoCard: React.FC = () => {
  return (
    <IonCard className={styles.orderInfoCard}>
      <IonCardHeader>
        <IonCardTitle>Order: 382993844</IonCardTitle>
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
