import { IonPage, IonContent } from "@ionic/react";
import Header from "../components/common/Header/Header";
import OrderInfoCard from "../components/orderInfoCard/OrderInfoCard";

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
      </IonContent>
    </IonPage>
  );
};

export default Home;
