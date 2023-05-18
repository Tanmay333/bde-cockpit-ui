import { IonPage, IonContent } from '@ionic/react';
import Header from '../components/common/header/Header';
import OrderInfoCard from '../components/orderInfoCard/OrderInfoCard';
import WorkDetails from '../components/orderDetails/OrderDetails';
import Phase from '../components/phase/Phase';
import PhaseDetails from '../components/phaseDetails/PhaseDetails';
import { useEffect, useState } from 'react';
import SplashScreen from '../components/splashScreen/SplashScreen';
import styles from './Home.module.scss';
import { useAppSelector } from '../store/utils/hooks';
import { useHistory } from 'react-router-dom';

const Home: React.FC = () => {
  const state = useAppSelector((state) => state.machineDetailsSlice.data);
  const history = useHistory();
  useEffect(() => {
    if (state?.process.currentPhaseDetails.state === 'DOWNTIME') {
      history.push('/downtimetype');
    }
  }, [state]);
  const [timeLeft, setTimeLeft] = useState(5);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);
    if (timeLeft === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timeLeft]);
  if (timeLeft !== 0) {
    return <SplashScreen />;
  }

  return (
    <IonPage>
      <Header />
      <IonContent>
        <OrderInfoCard />
        <Phase />
        <div className={styles.details}>
          <WorkDetails />
          <PhaseDetails />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
