import { IonContent, IonPage } from '@ionic/react';
import XCard from '../common/XCard/XCard';
import styles from '../common/XCard/XCard.module.scss';
import React from 'react';

const OrderDetails: React.FC = () => {
  const data = [
    {
      title: 'Order details',
      content: ['Order number: 382993844', 'Order quantity: 3,000'],
      btnText: 'Confirm details',
      btnLink: '/ConfirmOrderdetails',
    },
  ];
  return (
    <IonPage>
      <IonContent>
        {data.map((data, index) => {
          return (
            <XCard
              key={index}
              className={styles.center}
              title={data.title}
              content={data.content}
              btnText={data.btnText}
              btnLink={data.btnLink}
            />
          );
        })}
      </IonContent>
    </IonPage>
  );
};

export default OrderDetails;
