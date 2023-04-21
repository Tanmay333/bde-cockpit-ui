import { IonPage, IonContent } from "@ionic/react";
import Header from "../components/common/Header/Header";
import OrderInfoCard from "../components/orderInfoCard/OrderInfoCard";
import WorkDetails from "../components/orderInfoCard/WorkDetails";
import Phase from "../components/common/Header/Phase";

const Home = () => {
  return (
    <IonPage>
      <Header />
      <IonContent>
        <OrderInfoCard
          title={"Name of order"}
          subtitle={"Machine off"}
          description={"Time details"}
        />
        <Phase />
        <WorkDetails />
      </IonContent>
    </IonPage>
  );
};

export default Home;
