import { IonPage, IonRow, IonContent } from '@ionic/react';
import OrderInfoCard from '../orderInfoCard/OrderInfoCard';
import Header from '../common/header/Header';
import Phase from '../phase/Phase';
import CardContainer from '../common/cardContainer/CardContainer';

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
              <CardContainer key={index} title={data.title}>
                A
              </CardContainer>
            );
          })}
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default ConfirmOrderdetails;
