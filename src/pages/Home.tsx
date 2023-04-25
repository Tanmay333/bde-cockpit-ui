import { IonPage, IonContent, IonRow } from '@ionic/react';
import Header from '../components/common/header/Header';
import OrderInfoCard from '../components/orderInfoCard/OrderInfoCard';
import WorkDetails from '../components/orderDetails/OrderDetails';
import Phase from '../components/phase/Phase';
import PhaseDetails from '../components/phaseDetails/PhaseDetails';

const Home: React.FC = () => {
  return (
    <IonPage>
      <Header />
      <IonContent>
        <OrderInfoCard />
        <Phase />
        <IonRow>
          <WorkDetails />
          <PhaseDetails />
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Home;
