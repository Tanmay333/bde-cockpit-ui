import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import React from "react";
import styles from "./OrderInforCard.module.scss";

interface Props {
  title: string;
  subtitle: string;
  description: string;
}

const OrderInfoCard: React.FC<Props> = ({ title, subtitle, description }) => {
  return (
    <IonCard className={styles.orderInfoCard}>
      <IonCardHeader>
        <IonCardTitle className={styles.title}>{title}</IonCardTitle>
        <IonCardSubtitle className={styles.subtitle}>
          {subtitle}
        </IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent className={styles.description}>
        {description}
      </IonCardContent>
    </IonCard>
  );
};

export default OrderInfoCard;
