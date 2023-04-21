import { IonPage, IonContent } from '@ionic/react';
import Header from '../components/common/Header/Header';
import OrderInfoCard from '../components/orderInfoCard/OrderInfoCard';
import WorkDetails from '../components/workDetails/WorkDetails';
import Phase from '../components/Phase/Phase';

const Home: React.FC = () => {
  return (
    <IonPage>
      <Header />
      <IonContent>
        <OrderInfoCard />
        <Phase />
        <WorkDetails />
      </IonContent>
    </IonPage>
  );
};

export default Home;
