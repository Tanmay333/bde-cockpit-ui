import { IonPage, IonContent, IonRow } from '@ionic/react';
import Header from '../components/common/Header/Header';
import OrderInfoCard from '../components/orderInfoCard/OrderInfoCard';
import WorkDetails from '../components/workDetails/OrderDetails';
import Phase from '../components/Phase/Phase';
import PhaseDetails from '../components/workDetails/PhaseDetails';

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
