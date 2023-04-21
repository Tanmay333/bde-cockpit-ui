import XCard from '../common/XCard/XCard';
import { IonContent, IonPage, IonRow } from '@ionic/react';
import styles from '../common/XCard/XCard.module.scss';
// import style from './OrderInforCard.module.scss';
import OrderInfoCard from '../orderInfoCard/OrderInfoCard';
import Header from '../common/Header/Header';
import Phase from '../Phase/Phase';
// import index from '../selectWorkers/SelectWorkers';

const MembersDetails = () => {
  const data = [
    {
      title: 'Order details',
      btnText: 'Scan bar-code',
      btnLink: '/OrderDetails',
      content: [
        'Order number: 382993844',
        'Order quantity: 3,000',
        'Members: {index}',
      ],
    },
    {
      title: 'Phase details',
      btnText: 'End mounting',
      content: ['Start time: -- --', 'End time: -- --'],
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

export default MembersDetails;
