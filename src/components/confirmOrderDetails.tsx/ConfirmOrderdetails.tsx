import XCard from '../common/XCard/XCard';
import { IonPage, IonRow, IonContent } from '@ionic/react';
import styles from '../common/XCard/XCard.module.scss';
import OrderInfoCard from '../orderInfoCard/OrderInfoCard';
import Header from '../common/Header/Header';
import Phase from '../Phase/Phase';

const ConfirmOrderdetails = () => {
  const data = [
    {
      title: 'Order details',
      btnText: 'Scan bar-code',
      btnLink: '/OrderDetails',
      content: ['Order number: 382993844', 'Order quantity: 3,000'],
    },
    {
      title: 'Phase details',
      //btnText: "End mounting",
      content: ['Start time: 8:00', 'End time: -- --'],
    },
  ];

  return (
    <IonPage>
      <Header />
      <IonContent>
        <OrderInfoCard />
        <Phase />
        <IonRow>
          {data.map((data, index) => {
            return (
              <XCard
                key={index}
                className={styles.start}
                title={data.title}
                content={data.content}
                btnText={data.btnText}
                btnLink={data.btnLink}
              />
            );
          })}
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default ConfirmOrderdetails;
